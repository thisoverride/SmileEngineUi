export default class SplashView {
  public splashUi: DocumentFragment;
  private onAnimationEndHandler: () => void; 

  constructor(splashScreen: DocumentFragment) {
    this.splashUi = splashScreen;
    this.setupProgressBarHandler();
    this.onAnimationEndHandler = this._onAnimationEnd.bind(this); 
  }

  private setupProgressBarHandler() {
    const progressBar: HTMLElement | null = this.splashUi.getElementById('progress');

    if (progressBar) {
      progressBar.style.width = '0%';
    }
  }

  public updateProgressBar(progress: number) {
    const progressBar: HTMLElement | null = document.getElementById('progress');
    if (progressBar) {
      setTimeout(() => progressBar.style.width = `${progress}%`, 1000);
    }
  }

  public remove() {
    const splashScreen = document.getElementById('splash');

    if (splashScreen) {
      splashScreen.classList.add('fadeOut');
      splashScreen.addEventListener('animationend', this.onAnimationEndHandler);
    }
  }

  private _onAnimationEnd() {
    const splashScreen = document.getElementById('splash');
    if (splashScreen && splashScreen.parentNode) {
      splashScreen.parentNode.removeChild(splashScreen);
      splashScreen.removeEventListener('animationend', this.onAnimationEndHandler); 
    }
  }
}
