import WindowService from "../services/WindowService";
import { InjectEvent } from "../decorator/injector";

export default class NavigationController {
  private readonly windowsService: WindowService;

  constructor(windowsService: WindowService){
    document.addEventListener('changeScreen', this.navigationStack.bind(this));
   
    this.windowsService = windowsService;
  }

  private navigationStack(event: Event){
    const navigationEvent = event as CustomEvent;
    const targetScreen: string = navigationEvent.detail.set;

    switch (targetScreen) {
      case 'selectionView':
        this.renderModeSelectionView();
        break;
      case 'photoView':
        this.renderPhotoView();
        break;
      case 'optionPhotoView':
        this.renderOptionPhotoView();
        break;
      default:
        throw new Error(`Failed to access ${targetScreen} is not found`);
    }
  }

  @InjectEvent()
  public renderDefautlView(){
    const HomeView = this.windowsService.renderHomeView();
    this.render(HomeView)
  }

  @InjectEvent()
  private renderModeSelectionView(){
    try{
      const screen = this.windowsService.renderModeSelectionView()


      document.getElementById('app')!.innerHTML =""
      document.getElementById('app')!.appendChild(screen)

    }catch(e){
      console.log('ici')
    }
  }

  @InjectEvent()
  private renderPhotoView(){
    this.windowsService.renderPhotoView()
  }
  
  @InjectEvent()
  private renderOptionPhotoView(){
    this.windowsService.renderOptionPhotoView()
  }

  @InjectEvent()
  private renderBoomrangView(){
    throw new Error("Method not implemented.");
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