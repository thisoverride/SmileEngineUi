import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import EventService from './service/EventService';
import QRCode from 'qrcode';

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

   
    

    this.win.webContents.on('did-finish-load', async () => {
      // Envoyez un message au processus de rendu (front-end)
      this.win?.webContents.send('main-process-message', 'communication avec le front ici');
      this.win?.webContents.openDevTools();



      // const wifiConfig = `WIFI:T:${securityType};S:${ssid};P:${password};;`;

      // QRCode.toDataURL(wifiConfig, { errorCorrectionLevel: 'H' }, (err, url) => {
      //     if (err) {
      //         console.error('Erreur lors de la génération du QR code :', err);
      //     } else {
      //         // Envoyer l'URL du QR code généré au processus principal
      //         this.win?.webContents.send('main-process-message', url);
      //     }
      // });
    
  
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


  public start() {

  
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

