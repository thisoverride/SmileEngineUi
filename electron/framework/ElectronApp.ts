import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

export default class ElectronApp {
  public win: BrowserWindow | null;
  public splashScreen: BrowserWindow | null;
  public visualizerWin: BrowserWindow | null;
  public viteDevServerUrl: string | undefined;
  public currentContext :  'splashScreen' |'mainWindow' = 'splashScreen';
  private dataPreload: any = {}

  constructor() {
    this.win = null;
    this.visualizerWin = null;
    this.splashScreen = null;
    this.viteDevServerUrl = process.env.VITE_DEV_SERVER_URL;

    process.env.DIST = path.join(__dirname, '../dist');
    process.env.VITE_PUBLIC = app.isPackaged
      ? path.join(process.env.DIST, 'public')
      : path.join(process.env.DIST, '../public');
  }
  

  private createWindow() {

    this.win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      fullscreen: true,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: true
      },
    });




    // Test active push message to Renderer-process. front
    this.win.webContents.on('did-finish-load', () => {
      this.win?.webContents.send(
        'main-process-message',
        'communication avec le front ici'
      );
    });

    
    if(this.viteDevServerUrl){
      this.win.loadURL(this.viteDevServerUrl);
    }else{ 
      this.win.loadFile(path.join(process.env.DIST, 'index.html'));
    }
  }
  
  public start() {

    ipcMain.on('processingFinished',(_event,message)=> {
      this.dataPreload = message
      this.splashScreen?.hide();
      this.splashScreen?.webContents.send('close-splash',{
        closeSplash: true,
        context: this.currentContext,
      })
      
    })
    
    ipcMain.on('window-normalize', () => {
      this.splashScreen?.close()
      this.splashScreen?.destroy()
      this.splashScreen = null;
      this.currentContext = 'mainWindow';

      if(this.viteDevServerUrl){
        console.log(this.viteDevServerUrl)
        this.win?.loadURL(this.viteDevServerUrl).then(()=> {
          this.win?.show();
          // this.win?.webContents.openDevTools();
          this.win?.webContents.send('inject-page',{
            data: this.dataPreload,
            context: this.currentContext,
          })
        })

      }
    });

    // Uncomment the following block to properly handle the 'window-all-closed' event
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

    app.whenReady().then(() => this.createWindow());
  }
}
