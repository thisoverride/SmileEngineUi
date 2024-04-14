import UserController from "../controllers/UserController";
import PanelController from "../controllers/PanelController";
import DOMService from "../utils/DOMService";
import UserService from "../services/UserService";
import PanelService from "../services/PanelService";
import NavigationHandler from "./navigation/NavigationHandler";
import { io, type Socket } from "socket.io-client";

export default class ApplicationInitializer {
  private _socket: Socket; 

  constructor(URI: string){
    this._socket = io(URI);
  }

  public initialize() {
 
      const root: HTMLElement | null = document.getElementById('root');
      const applicationContainer: HTMLDivElement = document.createElement('div');
      applicationContainer.id= 'app';
      const systemControl : HTMLElement = document.createElement('div');
      systemControl.id = 'system-control';
  
      if(root){
        root.appendChild(systemControl);
        root.appendChild(applicationContainer);

        const domService = new DOMService();
        const windowService = new UserService(domService,this._socket);
        const userController = new UserController(windowService);
        const panelService = new PanelService(domService);
        const panelController = new PanelController(panelService);
        new NavigationHandler(userController,panelController);
        
        panelController.renderPanelAcessControl();
        userController.renderDefautlView();
      } else {
        throw new Error('Cannot be access to root element')
      }
    }

}