import type { App } from "electron";
import wifi, { type WiFiNetwork } from "node-wifi";
import player from "play-sound";
import path from  'path';
import { promises as fs } from 'fs';

export default class EventService {
  public restartApp(electronApp: App): void {
    electronApp.relaunch();
    electronApp.exit();
  }

  public async scanNetWork(): Promise<WiFiNetwork> {
    wifi.init({ iface: null });
    const currConnetion: WiFiNetwork[] = await wifi.getCurrentConnections();
    const connectionDetail: WiFiNetwork = currConnetion[0] ?? {};

    return connectionDetail;
  }

  public getTemplateMetaData() {
    // make me a fonction  to open a json file
  }

  public paySondEffect(effectName: string): void {
    // const play = player();

    // const publicDirectory: string = path.join(__dirname, '..', 'public');
    // const audioFile: string = path.join(publicDirectory, 'sounds', 'effects', `${effectName}.wav`);
    
    // play.play(audioFile, (err: any) => {
    //   if (err) console.log(`Impossible de lire le fichier audio: ${err}`);
    // });

  }

  public static async loadConfig(): Promise<string | null> {
    try {
     const config = await fs.readFile('electron/core/config.json', 'utf8');
      return config;
    } catch (error) {
      return null;
    }
  }
}
