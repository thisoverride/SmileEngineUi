import type { App } from 'electron';
import wifi, { type WiFiNetwork } from 'node-wifi';

export default class EventService {
 
  public restartApp(electronApp: App): void {
    electronApp.relaunch()
    electronApp.exit();
  }

  public async scanNetWork(): Promise<WiFiNetwork>{
      wifi.init({iface: null})
      const currConnetion: WiFiNetwork[] = await wifi.getCurrentConnections();
      const connectionDetail: WiFiNetwork = currConnetion[0] ?? {};

      return connectionDetail;
  }

}

