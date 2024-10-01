import { inject, injectable } from 'inversify';
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import BaseIpcCommunicationBridge from './base/BaseIpcCommunicationBridge';
import BoothService from '../../infrastructure/services/BoothService';

@injectable()
export default class BoothIpcBridge extends BaseIpcCommunicationBridge {
  private boothService: BoothService;

  constructor(@inject(BoothService) boothService: BoothService) {
    super();
    this.boothService = boothService;
  }

  public registerHandlers() {
    ipcMain.handle('camera:capture', this.handleCapture.bind(this));
    ipcMain.handle('system:shutdown', this.handleShutdown.bind(this));
    ipcMain.handle('system:reboot', this.handleReboot.bind(this));
  }

  private async handleCapture(_event: IpcMainInvokeEvent, ...args: any[]): Promise<any> {
      const result = await this.boothService.capturePhoto();
      return { success: true, message: 'Photo captured successfully', data: result };
  }

  private async handleShutdown(_event: IpcMainInvokeEvent): Promise<any> {
      const result = await this.boothService.shutdownSystem();
      return { success: true, message: 'System is shutting down', data: result };
  }

  private async handleReboot(_event: IpcMainInvokeEvent): Promise<any> {
      const result = await this.boothService.rebootSystem();
      return { success: true, message: 'System is rebooting', data: result };
  }
}
