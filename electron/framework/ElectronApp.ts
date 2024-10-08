import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import EventService from './service/EventService';



export default class ElectronApp {
  private win: BrowserWindow | null;
  private viteDevServerUrl: string | undefined;
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
      // focusable:true,
      // kiosk: true,
      // frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
      },
    });

   
    

    this.win.webContents.on('did-finish-load', async () => {});
    this.loadWindowContent();
  }

  private loadWindowContent() {
    if (this.viteDevServerUrl) {
      this.win?.loadURL(this.viteDevServerUrl);
    } else {
      this.win?.loadFile(path.join(process.env.DIST, 'index.html'));
    }
  }


  public start() {

    ipcMain.on('power-machine', () => {
      // this._eventService.restartApp(app)
 
      console.log('power-marchine invoked')
    });
    ipcMain.on('play-sound-effect',(_event,message) => {
      this._eventService.paySondEffect(message)
    })

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

