import WindowsController from "../controller/WindowsController";

export default class selectionView {
  public selectionUi: DocumentFragment;
  public windowsController: WindowsController;

  constructor(feature: DocumentFragment,windowsController: WindowsController) {
    this.windowsController = windowsController;
    this.selectionUi = feature;
    this.setup()
  }


  public setup() {

    const app: NodeListOf<Element> = this.selectionUi.querySelectorAll('.tile');
    if(app.length > 0){
      this.selectionUi.querySelectorAll('.tile').forEach(application => {
        application.addEventListener('click', this.handleTileClick.bind(this))
        application.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
      });
    }
  }

  private handleTileClick(event: Event): void {

    const element = event.currentTarget as HTMLElement;
    if(element && !element.classList.contains('tile--expanded')){
      element.style.pointerEvents = 'none';
      const parentElement = element.parentNode as HTMLElement;
      parentElement.classList.remove(parentElement.classList[0]);
      const icon = parentElement.querySelector('#icon-app') as HTMLElement;
      icon.style.zIndex = "1500";
      icon.style.width = "30%";
      icon.style.height = "30%";
      
      const tileRect = element.getBoundingClientRect();
      const width = tileRect.right - tileRect.left;
      const height = tileRect.bottom - tileRect.top;
      const iWidth = window.innerWidth;
      const iHeight = window.innerHeight;
  
    element.style.backgroundColor = "#050f1c"
    element.classList.add('tile--expanded');
    element.style.transform = `
      translateX(${(iWidth - width) / 2 - tileRect.left}px)
      translateY(${(iHeight - height) / 2 - tileRect.top}px)
      scaleX(${iWidth / width})
      scaleY(${iHeight / height})`;      
    }
  }

  private handleTransitionEnd(event: Event){
    const transitionEvent = event as TransitionEvent;
    if(transitionEvent.propertyName === "transform"){
      const element = event.currentTarget as HTMLElement;
      setTimeout(() => {
        element.classList.add('fadeOut');
        const app = document.getElementById('app');
        if(app){
          if(element.id === "app-02"){
            alert('Not root implemented')
          }
          if(element.id === "app-01"){
            this.windowsController.renderformatSlectionScreen(app)
          }
        }
      }, 800);
    }
  }

}
