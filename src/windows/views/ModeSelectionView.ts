export default class ModeSelectionView {
  private formatSelectionScreen: HTMLElement;

  constructor(formatSelectionScreen: HTMLElement) {
    this.formatSelectionScreen = formatSelectionScreen;
    this.init()
  }

  private async init() {
    const app: NodeListOf<Element> = this.formatSelectionScreen.querySelectorAll('.tile');

    if (app.length > 0) {
      this.formatSelectionScreen.querySelectorAll('.tile').forEach(application => {
        application.addEventListener('click', (event) => {
          const element = event.currentTarget as HTMLElement;
          if (element && !element.classList.contains('tile--expanded')) {
            element.style.pointerEvents = 'none';
            const parentElement = element.parentNode as HTMLElement;
            parentElement.classList.remove(parentElement.classList[0]);
            const icon = parentElement.querySelector('#icon-app') as HTMLElement;
            icon.style.zIndex = "1500";
            icon.style.width = "30%";
            icon.style.height = "30%";

            const tileRect = element.getBoundingClientRect();
            const width = tileRect.right - tileRect.left;
            const height = tileRect.bottom - tileRect.top;
            const iWidth = window.innerWidth;
            const iHeight = window.innerHeight;

            element.style.backgroundColor = "#050f1c"
            element.classList.add('tile--expanded');
            element.style.transform = `
              translateX(${(iWidth - width) / 2 - tileRect.left}px)
              translateY(${(iHeight - height) / 2 - tileRect.top}px)
              scaleX(${iWidth / width})
              scaleY(${iHeight / height})`;
          }
        })
        application.addEventListener('transitionend', (event: Event) => {
          const transitionEvent = event as TransitionEvent;
          if (transitionEvent.propertyName === "transform") {
            const element = event.currentTarget as HTMLElement;
            setTimeout(() => {
              const changeScreen = new CustomEvent('changeScreen', {
                detail: {
                  set: ''
                },
                bubbles: true,
                cancelable: true
              });

              element.classList.add('fadeOut');
              if (element.id === "app-02") {
                changeScreen.detail.set = 'optionBoomrangView';
                document.dispatchEvent(changeScreen)
              }
              if (element.id === "app-01") {
                changeScreen.detail.set = 'optionPhotoView';
                document.dispatchEvent(changeScreen)
              }
            }, 600);
          }
        });
      });
    }
  }

  public renderView() {
    return this;
  }

  public getScreen() {
    return this.formatSelectionScreen;
  }
}
