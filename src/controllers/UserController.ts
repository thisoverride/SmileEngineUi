import WindowService from "../services/UserService";
import { InjectEvent } from "../decorator/injector";

export default class UserController {
  private readonly windowsService: WindowService;

  constructor(windowsService: WindowService){
    this.windowsService = windowsService;
  }

 
  @InjectEvent()
  public renderDefautlView(){
    const homeView: HTMLElement = this.windowsService.renderHomeView();
    this.render(homeView,true);
  }


  public renderModeSelectionView(){
    try{
      const screen = this.windowsService.renderModeSelectionView()
      this.render(screen,true)

    }catch(e){
      console.log('ici')
    }
  }
  

  public renderOptionPhotoView(){
    const screen :HTMLElement = this.windowsService.renderOptionPhotoView();
    this.render(screen,true);

  }

  @InjectEvent()
  public renderBoomrangView(event : any){
    const screen = this.windowsService.renderBoomrangView(event)
    this.render(screen, true)
  
  }
  @InjectEvent()
  public renderMySelfView(){
    const screen = this.windowsService.renderMySelfView()
    this.render(screen, true)
  
  }

  public renderPreviewPhoto(event : any){
    const screen: HTMLElement = this.windowsService.previewPhotoView(event);
    this.render(screen, true)
  
  }

  public renderPhotoView(event: any){
    const screen = this.windowsService.renderPhotoView(event)
    this.render(screen, true)
  
  }

  public renderReceptionStepsScreen(event: any){
    const screen = this.windowsService.renderReceptionStepsScreen(event)
    this.render(screen, true)
  
  }

  public destroyView(event: any): void {
    this.windowsService.destroyView(event);
  }

  public render(childElement: DocumentFragment | HTMLElement, cleanParent?: Boolean){
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