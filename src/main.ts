import "./windows/styles/normalize.css";
import "./windows/styles/helpers.css";
import "./windows/styles/style.css";
import 'animate.css';
import ApplicationInitializer from "./core/ApplicationInitializer";

class Main {

  public  Main(): void {
    try {
      window.addEventListener('error', this.handleError);
      const applicationInitializer = new ApplicationInitializer("ws://192.168.1.138:3000");
      applicationInitializer.initialize();

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
new Main().Main()

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