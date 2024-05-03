import type { App } from "electron";
import wifi, { type WiFiNetwork } from "node-wifi";
import player from "play-sound";
import path from  'node:path';
import ping from "ping";

export default class EventService {
  private maxAttempts: number = 5;
  private currentAttempt:number = 0;

  
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


  public pingWithRetry() {
    this.currentAttempt++;
    console.log(`Tentative de ping #${this.currentAttempt}...`);
    ping.sys.probe('10.140.45.52', (isAlive) => {
        if (isAlive) {
            console.log('La machine est accessible');

        } else {
            console.log('La machine est inaccessible');
            if (this.currentAttempt < this.maxAttempts) {
                setTimeout(() => {
                    this.pingWithRetry();
                }, 3000);
            } else {
                console.log('Arrêt après ' + this.maxAttempts + ' tentatives infructueuses.');
            }
        }
    });
}

  public getTemplateMetaData() {
    // make me a fonction  to open a json file
  }

  public paySondEffect(effectName: string): void {
    const play = player();

    const publicDirectory: string = path.join(__dirname, '..', 'public');
    const audioFile: string = path.join(publicDirectory, 'sounds', 'effects', `${effectName}.wav`);
    
    play.play(audioFile, (err: any) => {
      if (err) console.log(`Impossible de lire le fichier audio: ${err}`);
    });

  }
}
