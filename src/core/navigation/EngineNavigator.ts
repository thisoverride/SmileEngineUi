import UserController from "../../controllers/UserController";
import PanelController from "../../controllers/PanelController";

export default class EngineNavigator {
  private userController: UserController;
  private panelController: PanelController

  constructor(userController: UserController, panelController: PanelController){
    this.userController = userController;
    this.panelController = panelController;
  }

  public onEvent(e: Event): void {
    
  }
}