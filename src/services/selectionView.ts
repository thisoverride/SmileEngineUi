import WindowsController from "../controller/WindowsController";

export default class selectionView {
  public selectionUi: DocumentFragment;
  public windowsController: WindowsController;

  constructor(feature: DocumentFragment,windowsController: WindowsController) {
    this.windowsController = windowsController;
    this.selectionUi = feature;
    this.setup()
  }


  public async setup() {


    this.selectionUi.querySelectorAll('.tile').forEach(tile => {
      tile.addEventListener('click', e => {
        const element = e.currentTarget;
        element.style.pointerEvents = 'none';

        console.log(element)
        
        const parentElement = element.parentNode;
        parentElement.classList.remove(parentElement.classList)
        const icon = parentElement.querySelector('#icon-app') as HTMLElement;
        icon.style.zIndex = "1500";
        icon.style.width = "200px";
        icon.style.height = "200px";

        if (!element.classList.contains('tile--expanded')) {
          expand(element);
        } 
      });
    });
  
  
  const expand = element => {
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
      // element.addEventListener('transitionend', ()=>{

      //   setTimeout(()=>{
      //     console.log(element.id)
      //     element.classList.add('fadeOut');
      //     const app = document.getElementById('app');
      //     if(app){
      //       if(element.id === "app-02"){
      //         alert('Not root implemented')
      //       }
      //       if(element.id === "app-01"){
      //         this.windowsController.renderCameraScreen(app)
      //       }
      //     }
      //   },3000)
      // });
  };

  }

  private handleTileClick(event: Event): void {
    const element = event.currentTarget as HTMLElement;;
    if(element){
      element.style.pointerEvents = 'none';
      const parentElement = element.parentNode as HTMLElement;
      parentElement.classList.remove(parentElement.classList[0]);
      const icon = parentElement.querySelector('#icon-app') as HTMLElement;
    }
  }

}
