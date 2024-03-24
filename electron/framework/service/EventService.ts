import type { App, BrowserWindow } from 'electron';
import wifi, { type WiFiNetwork } from 'node-wifi';
import axios, { AxiosInstance } from 'axios';

export default class EventService {
  private _instance: AxiosInstance;
  private _isLiveView: boolean = true
   constructor() {
    this._instance = axios.create({
      baseURL: "http://192.168.1.2:8080/ccapi/ver100/",
    });
   }

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

  public async takePhoto(): Promise<void> {
    this._isLiveView = false;
    await this._instance.post('/shooting/control/shutterbutton',{"af": true})
  }

  public async openLiveView(mainWindow: BrowserWindow,isActive: boolean):Promise <void> {
    this._isLiveView = isActive;
    const FPS = 30; // Frames par seconde
    const refreshRate = 1000 / FPS; // Intervalle entre chaque rafraîchissement en millisecondes

    console.log(isActive)
  
    while (this._isLiveView) {
      console.log('> render frame is running ')
      try {
        const { data } = await axios.get('http://192.168.1.2:8080/ccapi/ver100/shooting/liveview/flip', { responseType: 'arraybuffer' });
        const imageData = Buffer.from(data, 'binary').toString('base64');
        const imageUrl = `data:image/jpeg;base64,${imageData}`;
        mainWindow.webContents.send('liveViewImage', imageUrl);

      } catch (error) {
        console.error('Erreur lors de la récupération de l\'image:', error);
        await new Promise(resolve => setTimeout(resolve, refreshRate)); 
      }
    }
    console.log('finish')
  }
  
  public async getPhoto() {
    const response = await this._instance.get('/contents/sd/100CANON')

    return response.data

  }

  public async initCamera() {
    try{
      const parameters = { liveviewsize: "medium",  cameradisplay: "off" };
      await this._instance.post('http://192.168.1.2:8080/ccapi/ver100/shooting/liveview',parameters);
    }catch(error){
      console.log(error)
    }
  }

}

