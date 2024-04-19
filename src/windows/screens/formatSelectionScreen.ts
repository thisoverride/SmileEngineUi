import { buttonPrimaryComponent } from "../component/buttonPrimaryComponent";
export const formatSelectionScreen =  `
  <div class="format-selection-wrp">
  <div class="smile-engine-logo">
  <div class="smile-engine-logo-applogo" style="background-image: url('icon/smile-engine.png');"></div>
    </div>
    <div class="col w-100 gap-80 btn-container">
      <div id="indicator-selection" class="text-indicator-selection">Sélectionnez votre collage :</div>
      <div class="collage"></div>
      <div class="row gap-80 w-100 justify-center">
      ${buttonPrimaryComponent({
        className: "btn-secondary btn-collage-action",
        textContent: "Précédent",
        dataScreen: "selectionView"
      })}
      ${buttonPrimaryComponent({
        className: "btn-primary btn-collage-action",
        textContent: "Suivant",
        dataScreen: "photoView"
      })}
      </div>
    </div>
  </div>
`;
