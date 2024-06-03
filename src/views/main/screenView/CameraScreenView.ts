export default class CameraScreenView {

  protected renderTemplate() {
    const template = document.createElement('template')
    template.innerHTML =`
    <div class="camera-view col p-10">
    <div class="camera-timer">10</div>
    <canvas class="render-camera"></canvas>
  </div>`
  const body = template.content.firstElementChild as HTMLElement;
  const footer = this._renderFooter();
  return { body:  body ,footer : footer };
  }
  private _renderFooter(): HTMLElement {
    const template = document.createElement('template')
    template.innerHTML =`
    <div class="camera-view-footer row">
    <div class="camera-view-button-container">
      <div id="btnReturn" class="btn-secondary-return"></div>
    </div>
    <button id="btnPhoto" class="btn-secondary"></button>
    <div class="camera-view-button-container">
      <div class="btn-secondary-return"></div>
    </div>
  </div>`
  const footer = template.content.firstElementChild as HTMLElement;
  return footer;
  }

}
