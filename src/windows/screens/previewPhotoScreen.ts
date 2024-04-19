import { buttonPrimaryComponent } from "../component/buttonPrimaryComponent";
export const previewPhotoScreen =  `
  <div class="_photo_preview_wrp">
  <div class="smile-engine-logo">
  <div class="smile-engine-logo-applogo" style="background-image: url('icon/smile-engine.png');"></div>
  </div>
    <div class="col align-items-center gap-15">
      <div class="text-indicator-selection"> Validez pour passer à la photo suivante :</div>
      <div class="row w-100 justify-center">
        <canvas class="canvas-test"></canvas>
        </div>
        <div class="btn-trash"></div>
        <div class="btn-next"> 
        ${buttonPrimaryComponent({
          id:"validate",
          className:"btn-secondary",
          textContent :"Étape suivante"
        })}
        </div>
    </div>
  </div>
  `;

