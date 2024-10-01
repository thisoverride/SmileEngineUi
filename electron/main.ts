import 'reflect-metadata';
import { app } from 'electron';
import { Container } from 'inversify';
import WindowManager from './infrastructure/internal/window/WindowManager';
import BoothIpcBridge from './interfaces/ipc/BoothIpcBridge';
import BoothService from './infrastructure/services/BoothService';
import SystemManager from './infrastructure/external/win/services/SystemManager';

export default class Main {
  private windowManager: WindowManager;
  private boothIpcBridge: BoothIpcBridge;

  private IoCContainer: Container;

  constructor() {
    this.IoCContainer = new Container();
    this._initializeIoCContainer();
    this.windowManager = this.IoCContainer.get(WindowManager);
    this.boothIpcBridge = this.IoCContainer.get(BoothIpcBridge);
    this._initializeApp();
  }

  private _initializeApp(): void {
    app.on('window-all-closed', this._onWindowAllClosed.bind(this));
    app.on('activate', this._onActivate.bind(this));
    app.whenReady().then(this._onAppReady.bind(this));
    this.boothIpcBridge.registerHandlers();
  }

  private _initializeIoCContainer(): void {
    this.IoCContainer.bind(WindowManager).toSelf().inSingletonScope();
    this.IoCContainer.bind(BoothIpcBridge).toSelf().inSingletonScope();
    this.IoCContainer.bind(BoothService).toSelf().inSingletonScope();
    this.IoCContainer.bind(SystemManager).toSelf().inSingletonScope();
  }

  private _onAppReady(): void {
    this.windowManager.createMainWindow();
  }

  private _onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private _onActivate(): void {
    if (this.windowManager.noWindowsOpen()) {
      this.windowManager.createMainWindow();
    }
  }
}
new Main()