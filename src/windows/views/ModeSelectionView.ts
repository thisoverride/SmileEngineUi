import type { Socket } from "socket.io-client";

export default class ModeSelectionView {
  private formatSelectionScreen: HTMLElement;
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: {
      set: '',
      params:'',
      emit: '',
      scope: ''
    },
    bubbles: true,
    cancelable: true
  });

  private socket: Socket;

  constructor(formatSelectionScreen: HTMLElement,socket: Socket) {
    this.formatSelectionScreen = formatSelectionScreen;
    this.socket =socket;
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

              // this.socket.emit('stream',{data:'stream'})
              element.classList.add('fadeOut');
              if (element.id === "app-02") {
                ModeSelectionView.CHANGE_SCREEN_EVENT.detail.set = 'optionBoomrangView';
                ModeSelectionView.CHANGE_SCREEN_EVENT.detail.emit= ModeSelectionView.name;
                ModeSelectionView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
                document.dispatchEvent(ModeSelectionView.CHANGE_SCREEN_EVENT)
              }
              if (element.id === "app-01") {        
                ModeSelectionView.CHANGE_SCREEN_EVENT.detail.set = 'optionPhotoView';
                ModeSelectionView.CHANGE_SCREEN_EVENT.detail.emit= ModeSelectionView.name;
                ModeSelectionView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
                document.dispatchEvent(ModeSelectionView.CHANGE_SCREEN_EVENT)
              }
            }, 300);
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
