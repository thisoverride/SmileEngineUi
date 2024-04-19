import UserController from "../../controllers/UserController";
import PanelController from "../../controllers/PanelController";

export default class NavigationHandler {
  private userController: UserController;
  private panelController: PanelController

  constructor(userController: UserController, panelController: PanelController){
    this.userController = userController;
    this.panelController = panelController;
    document.addEventListener('changeScreen', this.onEvent.bind(this));
  }

  private onEvent = (e: Event): void => {
    const { scope } = (e as ChangeScreenEvent).detail;
    if (!scope || !scope) {
      throw new Error('Scope property not found in event detail.');
    }
    if (scope === 'USR_CRL') {
      this.userController.navigationStack(e);
    } else if (scope === 'PAL_CRL') {
      this.panelController.navigationStack(e);
    } else {
      throw new Error('Unknown scope value in event detail.');
    }
  };
}