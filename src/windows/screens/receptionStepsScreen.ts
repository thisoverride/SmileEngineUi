import { buttonPrimaryComponent } from "../component/buttonPrimaryComponent";
export const receptionStepsScreen =  `
<div class="_home-wrp">
  <div class="_mode_selection_wrp">
    <div class="logo">
    <div class="applogo" style="background-image: url('/smile-engine.png');"></div>
    </div>
    <div class="col align-items-center gap-30">
      <div id="indicator-selection" class="poop"></div>
      <div class="row w-100 justify-center">
        <div class="choice-recuperation-photo col align-items-center text-center">
          <h1> Imprimez,<br/>
          Scannez,
          <br/>&<br/>
          Recommencer !</h1>
          <div class="row">aaaa</div>
        </div>
        </div>
        <div class="btn-next"> 
        ${buttonPrimaryComponent({
          id:"1",
          className:"btn-primary",
          dataScreen:"homeView",
          textContent :"Terminé",
        })}
        </div>
    </div>
  </div>
</div>
  `;

