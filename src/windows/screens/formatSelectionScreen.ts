import { buttonPrimaryComponent } from "../component/buttonPrimaryComponent";
export const formatSelectionScreen =  `
  <div class="format-selection-wrp">
  <div class="smile-engine-logo">
  <div class="smile-engine-logo-applogo" style="background-image: url('icon/smile-engine.png');"></div>
    </div>
    <div class="col w-100 gap-80 btn-container">
      <div id="indicator-selection" class="text-indicator-selection"></div>
      <div class="collage hidden animate__animated animate__fadeIn"></div>   
        <div id="orientation" class="orientation row justify-evenly align-center">
          <div id="landscape" class="landscape row justify-center align-center">
            Paysage
            </div>
            <div id="portrait" class="portrait row justify-center align-center">
            Portrait
            </div>
        </div>
      
      <div class="row gap-80 w-100 justify-center">
      ${buttonPrimaryComponent({
        id:"btn-action-return",
        className: "btn-secondary btn-collage-action",
        textContent: "Précédent"
      })}
      ${buttonPrimaryComponent({
        id:"btn-action-next",
        className: "btn-primary btn-collage-action v-hidden",
        textContent: "Suivant",
      })}
      </div>
    </div>
  </div>
`;
