import ServiceUtils from "./ServiceUtils";
import { statusBar } from "../windows/component/statusBar";

export default class WindowService extends ServiceUtils {
  private _controlControl: number = 0;

  public initializationUi(...args: string[]): DocumentFragment {
    const componantStructure: DocumentFragment = document.createDocumentFragment();
    
    args.forEach((componant) => {
      const componentFragment = this.buildScreen(componant);
      componantStructure.appendChild(componentFragment);
    });
  
    return componantStructure;
  }
  public setStatusBar(): DocumentFragment {
    const statusControl = this.buildScreen(statusBar(true))
    const checkPoint = statusControl.querySelector('#pt_control') as HTMLElement | null;
    
    if (checkPoint) {

      const handleClick = () => {
        this._controlControl += 1;
    
        if (this._controlControl === 1) {
          checkPoint.classList.add('crl_pos-1');

        } else if (this._controlControl === 2) {
          checkPoint.classList.remove('crl_pos-1');
          checkPoint.classList.add('crl_pos-2');

        } else if (this._controlControl === 3) {
          this._controlControl = 0;
          checkPoint.classList.remove('crl_pos-2');
          checkPoint.classList.add('crl_pos-0');

          const faceID = document.getElementById('modal-1');

          if (faceID) {
            faceID.classList.toggle("md-show");
          
            const closeFaceId = document.getElementById('md-close');
          
            if (closeFaceId) {
              closeFaceId.addEventListener('click', () => {
                faceID.classList.remove('md-show');
              });
            }
          }
        }
        const resetDelay: number = 3000; 
        setTimeout(() => {
          this._controlControl = 0;
          checkPoint.classList.remove('crl_pos-1', 'crl_pos-2');
          checkPoint.classList.add('crl_pos-0');
        }, resetDelay);
      };
    
      checkPoint.addEventListener('click', handleClick);
    }
    
    return statusControl
  }

  private buildScreen(screen: string) {
    return this.htmlStringToNode(screen);
  }

  public buildSaverScreen(screen: string){
    const buildedScreen = this.buildScreen(screen);
    const containerScreen = buildedScreen.querySelector('.instruction');


    if(containerScreen){
      containerScreen.addEventListener('click',() =>{
        const checkPoint = document.querySelector('#pt_control') as HTMLElement;
        if (checkPoint.classList.contains('crl_pos-1') || checkPoint.classList.contains('crl_pos-2')) {
          checkPoint.classList.remove('crl_pos-1', 'crl_pos-2');
          this._controlControl = 0;
        }
        const value = document.querySelector('.test') as HTMLElement | null
        console.log(value)
        value!.classList.add('test-visible')
        value?.classList.remove('.test')
      })

      
    }
    
  return buildedScreen;
  }

}