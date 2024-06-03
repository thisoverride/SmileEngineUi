export default class CaptureModeSelectionScreenView {
  constructor(){}

  protected renderTemplate(): string {
      return `<div class="capture-Mode-SelectionView">
    <div class="col">
      <div class="row">
        <div class="booth-os-app-container col" id="photo">
          <div class="booth-app"></div>
          <div class="booth-app-title">Photographie</div>
        </div>
        <div class="booth-os-app-container col" id="boomerang">
          <div class="booth-app"></div>
          <div class="booth-app-title">Boomerang</div>
        </div>
      </div>
      <div class="row">
        <div class="booth-os-app-container col" id="myself">
          <div class="booth-app"></div>
          <div class="booth-app-title">Myself</div>
        </div>
      </div>
    </div>
  </div>`;
  }
}