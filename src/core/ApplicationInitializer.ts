import NavigationController from "../controllers/NavigationController";


export default class ApplicationInitializer {
  private _navigationController: NavigationController

  constructor(navigationController: NavigationController){
    this._navigationController = navigationController;
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
      this._navigationController.renderDefautlView()
    }else{
      throw new Error('Cannot be access to root element')
    }
  }


}