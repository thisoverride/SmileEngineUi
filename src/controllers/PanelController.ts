import { InjectEvent } from "../decorator/injector";
import PanelService from "../services/PanelService";

export default class PanelController {
  private readonly panelService: PanelService;

  constructor(panelService: PanelService){   
    this.panelService = panelService;
  }


public renderPanelAcessControl(event: any){
   const settingsView = this.panelService.mountPanelAccess(event);
   document.getElementById('app')!.remove()
   document.getElementById('root')!.appendChild(settingsView)
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
