import '../new-interf/normalize.css'
import '../new-interf/style.css'
import 'animate.css';
import layoutManager from "./manager/LayoutManager";
import NavigationView from './core/navigation/Navigation';
import { HomeView } from './views/main/views';


export default class Main {
  constructor(containerID: HTMLElement, config: string | null) {
    this.main(containerID ,JSON.parse(config ?? ''))
  }

  public main(containerID: HTMLElement, config: any ): void {
    try {
      window.addEventListener('error', this.handleError);
      window.navigation = new NavigationView();
      window.app = new layoutManager(containerID , config);
      window.app.render();
      window.app.setMain(new HomeView({
        title:'Capturez des souvenirs inoubliables !',
        buttonText:'Touchez l’écran pour commencer'}).render())
  
    } catch (e: any) {
        this.handleError(e);
    }
  }
  private handleError(e: unknown) {
    let error: any = null
   
    if(e instanceof ErrorEvent){
        error = e.error
    }else{
        error = e;
    }
    const errorStringify: string = String(error);
    const errTitleSplit = errorStringify.split('</>');
    let detailError: string[] = [];
    let TitleError: string[] = [];

    if (errTitleSplit.length >= 2) {
      TitleError = errTitleSplit[1].split('<->');
      detailError = errTitleSplit[1].split('<->');
    }
    
    document.body.style.backgroundColor = "#060606d0";
    document.body.innerHTML = 
    `<div id="_err" class="err-container">
        <div class="error-indicator">
        <img id="_err_ico_loader" src=${'icon/err/err_d.png'}>
        </div>
        <div id="_err_body" class="_err">
        ${`<h3> > ${TitleError[0] ?? errorStringify}</h3>
        <span>${detailError[0] ?? error.stack}</span>
        <span>${detailError[1] ?? ''}</span>`}
        </div>
    </div> ` 
  }
}


// window.ipcRenderer.on('main-process-message',(_e,message) => {}

// document.body.style.backgroundColor = "#000";
// document.body.innerHTML = 
// ` <div class="_fatal-error-wrp">
// <div class="_fatal-error">
//     <div>!</div>
// </div>
// <div class="error-code">
// <p class="pb-15">smileengine.com/support</p>
// <span><code>EFOP-3</code></span>
// </div>
// </div>` 