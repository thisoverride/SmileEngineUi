import UserService from "./services/UserService";
import DOMService from "./utils/DOMService";
import "./windows/styles/normalize.css";
import "./windows/styles/helpers.css";
import "./windows/styles/style.css";
import "boxicons";
import UserController from "./controllers/UserController";
import ApplicationInitializer from "./core/ApplicationInitializer";
import PanelService from "./services/PanelService";
import PanelController from "./controllers/PanelController";

class Main {

  public  Main(): void {
    try {
      const domService = new DOMService();
      const windowService = new UserService(domService);
      const userController = new UserController(windowService);
      window.addEventListener('error', this.handleError);
      const panelService = new PanelService(domService);
      const panelController = new PanelController(panelService);
      const applicationInitializer = new ApplicationInitializer(userController,panelController);
      applicationInitializer.initialize();

    } catch (e: any) {
        this.handleError(e);
    }
  }

  private handleError(e: unknown) {
    let error: any = null
   
    if(e instanceof ErrorEvent){
        error = e.error
    }else{
        error = e
    }
    const errorStringify: string = String(error);
    const errTitleSplit = errorStringify.split('</>');
    let detailError: string[] = [];
    let TitleError: string[] = [];

    if (errTitleSplit.length >= 2) {
      TitleError = errTitleSplit[1].split('<->');
      detailError = errTitleSplit[1].split('<->');
    }
    
    document.body.style.backgroundColor = "#060606d0";
    document.getElementById('root')!.innerHTML = 
    `<div id="_err" class="err-container">
        <div class="error-indicator">
        <img id="_err_ico_loader" src=${'public/error-2.png'}>
        </div>
        <div id="_err_body" class="_err">
        ${`<h3> > ${TitleError[0] ?? errorStringify}</h3>
        <span>${detailError[0] ?? error.stack}</span>
        <span>${detailError[1] ?? ''}</span>`}
        </div>
    </div> ` 
  }
}
new Main().Main()
