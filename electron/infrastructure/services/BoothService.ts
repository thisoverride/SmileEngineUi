import { inject, injectable } from "inversify";
import SystemManager from "../external/win/services/SystemManager";
import Store from 'electron-store';

@injectable()
export default class BoothService {
  private systemManager: SystemManager;
  // private parameterStore: Store;

  constructor(@inject(SystemManager) systemManager: SystemManager){
    this.systemManager = systemManager;
    
  }

  public async rebootSystem() {
    await this.systemManager.reboot();
  }
  public async shutdownSystem() {
    await this.systemManager.shutdown();
  }
  public async capturePhoto() {
    throw new Error('Method not implemented.');
  }

}