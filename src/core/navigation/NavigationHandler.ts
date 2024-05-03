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
    
    switch (scope) {
      case 'USR_CRL':
        this.navigationStackUser(e);
        break;
      case 'PAL_CRL':
        this.navigationStackPanel(e);
        break;
      case 'USR_CRL_DESTRY':
        this.userController.destroyView(e);
        break;
    
      default:
        throw new Error('Unknown scope value in event detail.');
    }
  };


  public navigationStackUser(event: Event): void  {
    const navigationEvent = event as CustomEvent;
    const targetScreen: string = navigationEvent.detail.set;

    switch (targetScreen) {
      case 'homeView':
        this.userController.renderDefautlView();
        break;
      case 'selectionView':
        this.userController.renderModeSelectionView();
        break;
      case 'photoView':
        this.userController.renderPhotoView(event)
        break;
      case 'optionPhotoView':
        this.userController.renderOptionPhotoView();
        break;
      case 'optionBoomrangView':
        this.userController.renderBoomrangView(event);
        break;
      case 'receptionSteps':
        this.userController.renderReceptionStepsScreen(event);
        break;
      case 'previewPhoto':
        this.userController.renderPreviewPhoto(event);
        break;
      default:
        throw new Error(`Failed to access ${targetScreen} is not found`);
    }
  }

  public navigationStackPanel(event: Event):void {

    const navigationEvent = event as CustomEvent;
    const targetScreen: string = navigationEvent.detail.set;

    switch (targetScreen) {
      case 'settingsView':
        this.panelController.renderPanelAcessControl(event)
        break;
      default:
        throw new Error(`Failed to access ${targetScreen} is not found`);
    }

  }
}