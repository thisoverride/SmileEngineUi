export default class PhotoOrientationViewScreen {

  public renderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
    <div class="photo-orientation-frameview col">
    <div class="row">
    <div class="photo-collage"></div>
      <div id="oriantation-group" class="oriantation-landsacape">
        Paysage
      </div>
      <div id="oriantation-group" class="oriantation-portrait">
        Portrait
      </div>
    </div>
  </div>`
  const body = template.content.firstElementChild as HTMLElement;
  const footer = this._renderFooter()
    return { body: body , footer: footer};
  }

  private _renderFooter(): HTMLElement {
    const template = document.createElement('template')
    template.innerHTML =`
    <div class="photo-orientation-frameview-footer">
    <div class="row">
      <button id="return" class="btn-secondary">Précédent</button>
      <button id="next" class="btn-primary animate__animated animate__fadeIn animate__delay-1s v-hidden">Suivant</button>
  </div>
  </div>`
  const footer = template.content.firstElementChild as HTMLElement;
  return footer;
  }
}