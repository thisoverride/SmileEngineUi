import { BrowserWindow } from 'electron';
import { injectable } from 'inversify';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Store from 'electron-store';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

@injectable()
export default class WindowManager {
  private mainWindow: BrowserWindow | null = null;
  private parameterStore: Store =  new Store()

  public createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 900, 
      height: 700,
      backgroundColor: '#000',
      // focusable:true,
      // kiosk: true,
      // frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
      },
    }); 

    this.mainWindow.webContents.on('did-finish-load', () => {
      const config = this.parameterStore.get('preferences');
      this.mainWindow!.webContents.send('main-process-message', config);
    });

    const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
    const RENDERER_DIST = process.env['RENDERER_DIST'];

    if (VITE_DEV_SERVER_URL) {
      this.mainWindow.loadURL(VITE_DEV_SERVER_URL);
    } else {
      this.mainWindow.loadFile(path.join(RENDERER_DIST!, 'index.html'));
    }
  }


  public static getFocusedWindow(): BrowserWindow | null {
    return BrowserWindow.getFocusedWindow();
  }

  public noWindowsOpen(): boolean {
    return BrowserWindow.getAllWindows().length === 0;
  }
}
