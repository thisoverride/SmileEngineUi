import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import EventService from './service/EventService';

export default class ElectronApp {
  private win: BrowserWindow | null;
  private viteDevServerUrl: string | undefined;
  private currentContext: 'splashScreen' | 'mainWindow' = 'splashScreen';
  private dataPreload: any = {};
  private _eventService: EventService;

  constructor(eventService: EventService) {
    this._eventService = eventService;
    this.win = null;
    this.viteDevServerUrl = process.env.VITE_DEV_SERVER_URL;

    this.setupEnvironment();
  }

  private setupEnvironment() {
    process.env.DIST = path.join(__dirname, '../dist');
    process.env.VITE_PUBLIC = app.isPackaged
      ? path.join(process.env.DIST, 'public')
      : path.join(process.env.DIST, '../public');
  }

  private createWindow() {
    this.win = new BrowserWindow({
      width: 900, 
      height: 700,
      // frame: false,
      // fullscreen: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
      },
    });

   
    

    this.win.webContents.on('did-finish-load', async () => {
      // Envoyez un message au processus de rendu (front-end)
      this.win?.webContents.send('main-process-message', 'communication avec le front ici');
  
      // Démarrez le premier scan réseau
      const connectionDetail = await this._eventService.scanNetWork();
      this.win?.webContents.send('scan-network', connectionDetail);
  
      // Définissez l'intervalle pour les scans réseau périodiques
      // setInterval(async () => {
      //     const connectionDetail = await this._eventService.scanNetWork();
      //     this.win?.webContents.send('scan-network', connectionDetail);
      // }, 100000);
  });
 
    this.loadWindowContent();
  }

  private loadWindowContent() {
    if (this.viteDevServerUrl) {
      this.win?.loadURL(this.viteDevServerUrl);
    } else {
      this.win?.loadFile(path.join(process.env.DIST, 'index.html'));
    }
  }

  private loadMainWindowContent() {
    if (this.viteDevServerUrl) {
      this.win?.loadURL(this.viteDevServerUrl).then(() => {
        this.win?.show();
        // this.win?.webContents.openDevTools();
        this.win?.webContents.send('inject-page', {
          data: this.dataPreload,
          context: this.currentContext,
        });
      });
    }
  }

  public start() {
    
    ipcMain.on('processingFinished', (_event, message) => {
      this.dataPreload = message;
    });

    ipcMain.on('window-normalize', () => {
      this.currentContext = 'mainWindow';
      this.loadMainWindowContent();
    });

    ipcMain.on('power-machine', () => {
      this._eventService.restartApp(app)
      console.log('power-marchine invoked')
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });

    app.whenReady().then(async() => {
      this.createWindow();
    });
  }
}

