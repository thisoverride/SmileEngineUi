import { InjectEvent } from "../decorator/injector";
import PanelService from "../services/PanelService";

export default class PanelController {
  private readonly panelService: PanelService;

  constructor(panelService: PanelService){   
    this.panelService = panelService;
  }

  public navigationStack(event: Event){
    const navigationEvent = event as CustomEvent;
    const targetScreen: string = navigationEvent.detail.set;

    switch (targetScreen) {
      case 'settingsView':
        this.renderPanelAcessControl();
        break;
      default:
        // throw new Error(`Failed to access ${targetScreen} is not found`);
    }
  }

  @InjectEvent()
public renderPanelAcessControl(){
     const statusBar = this.panelService.mountPanelAccess();
     this.render(statusBar);
  }

  private render(childElement: DocumentFragment | HTMLElement, cleanParent?: Boolean){
    const app = document.getElementById('system-control');
    if(app){
      if(cleanParent){
        app.innerHTML = ""; 
        app.appendChild(childElement);
      }else{
        app.appendChild(childElement);
      }
    }
  }

}