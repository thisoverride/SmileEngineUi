import { buttonCameraComponent } from "../component/buttonCameraComponent";
import { buttonPrimaryComponent } from "../component/buttonPrimaryComponent";
export const previewPhotoScreen =  `
<div class="_home-wrp">
  <div class="_mode_selection_wrp">
    <div class="logo">
    <div class="applogo" style="background-image: url('/smile-engine.png');"></div>
    </div>
    <div class="col align-items-center gap-30">
      <div id="indicator-selection" class="poop"> Validez pour passer à la photo suivante :</div>
      <div class="row w-100 justify-center">
        <canvas class="canvas-test"></canvas>
        </div>
        <div class="btn-trash"></div>
        <div class="btn-next"> 
        ${buttonPrimaryComponent({
          id:"1",
          className:"btn-secondary",
          textContent :"Étape suivante",
          dataScreen :"receptionSteps"
        })}
        </div>
    </div>
  </div>
</div>
  `;

