import { buttonPrimaryComponent } from "../windows/component/buttonPrimaryComponent";
export const formatSelectionScreen =  `
<div class="_home-wrp">
  <div class="_mode_selection_wrp">
    <div class="logo">
    <div class="applogo" style="background-image: url('/smile-engine.png');"></div>
    <h1>Photographie</h1>
    </div>
    <div class="col gap-80">
      <div id="indicator-selection" class="poop">Séléctionnez votre format</div>
      <div class="row gap-80 w-100 justify-center">
      ${buttonPrimaryComponent({
        className: "btn-secondary",
        textContent: "Précédent",
        dateScreen: "selectionView"
      })}
      ${buttonPrimaryComponent({
        className: "btn-primary",
        textContent: "Suivant",
        dateScreen: "photoView"
      })}
      </div>
    </div>
  </div>
</div>
`;
