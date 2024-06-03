import CaptureModeSelectionScreenView from "./screenView/CaptureModeSelectionScreenView";

export default class CaptureModeSelectionView extends CaptureModeSelectionScreenView {
  constructor() {
    super()
  }

  private _initView(element: HTMLElement): void {
    const containers = element.querySelectorAll('.booth-os-app-container');
    window.app.changeTitle('Sélectionnez votre mode de capture :');
  
    containers.forEach((container) => {
      container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const clickedContainer = target.closest('.booth-os-app-container') as HTMLElement;
        const titleElement = clickedContainer?.querySelector('.booth-app-title') as HTMLElement;
  
        if (clickedContainer && titleElement) {
          const titleText = titleElement.textContent;
          const appElement = document.querySelector('#app') as HTMLElement;
  
          if (appElement) {
            appElement.style.display = 'none';
          }
  
          const transitionElement = document.createElement('div');
          transitionElement.classList.add('container-transition');
          const t = titleText!.split('');
          t.forEach((letter: string) => {
            const span = document.createElement('span');
            span.classList.add('title');
            span.textContent = letter;
            transitionElement.appendChild(span);
          })
          

          document.getElementById('root')!.appendChild(transitionElement);
          setTimeout(() => {
            transitionElement.remove();
            window.navigation.changeView('PhotoOrientationViewScreen');
            if (appElement) {
              appElement.style.display = 'flex';
            }
          }, 2500);

        }
      });
    });
  }
  

  public render() {
    const template = document.createElement('template');
    template.innerHTML = super.renderTemplate();
    const element = template.content.firstElementChild as HTMLElement;
    this._initView(element) 
    return element; 
  }
}
