import WindowService from "../services/UserService";
import { InjectEvent } from "../decorator/injector";

export default class UserController {
  private readonly windowsService: WindowService;

  constructor(windowsService: WindowService){
    this.windowsService = windowsService;
  }

  public navigationStack(event: Event){
    const navigationEvent = event as CustomEvent;
    const targetScreen: string = navigationEvent.detail.set;

    switch (targetScreen) {
      case 'homeView':
        this.renderDefautlView();
        break;
      case 'selectionView':
        this.renderModeSelectionView();
        break;
      case 'photoView':
        this.renderPhotoView(event)
        break;
      case 'optionPhotoView':
        this.renderOptionPhotoView();
        break;
      case 'optionBoomrangView':
        this.renderBoomrangView();
        break;
      case 'receptionSteps':
        this.renderReceptionStepsScreen();
        break;
      case 'previewPhoto':
        this.renderPreviewPhoto(event)
        break;
      default:
        throw new Error(`Failed to access ${targetScreen} is not found`);
    }
  }

  @InjectEvent()
  public renderDefautlView(){
    const homeView: HTMLElement = this.windowsService.renderHomeView();
    this.render(homeView,true);
  }

  @InjectEvent()
  private renderModeSelectionView(){
    try{
      const screen = this.windowsService.renderModeSelectionView()
      this.render(screen,true)

    }catch(e){
      console.log('ici')
    }
  }
  
  @InjectEvent()
  private renderOptionPhotoView(){
    const screen :HTMLElement = this.windowsService.renderOptionPhotoView();
    this.render(screen,true);

  }

  @InjectEvent()
  private renderBoomrangView(){
    const screen = this.windowsService.renderBoomrangView()
    this.render(screen, true)
  
  }
  @InjectEvent()
  private renderPreviewPhoto(event : any){
    const screen: HTMLElement = this.windowsService.previewPhotoView(event);
    this.render(screen, true)
  
  }
  @InjectEvent()
  private renderPhotoView(event: any){
    const screen = this.windowsService.renderPhotoView(event)
    this.render(screen, true)
  
  }

  @InjectEvent()
  private renderReceptionStepsScreen(){
    const screen = this.windowsService.renderReceptionStepsScreen()
    this.render(screen, true)
  
  }

  private render(childElement: DocumentFragment | HTMLElement, cleanParent?: Boolean){
    const app = document.getElementById('app');
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