import { accessControl } from "../windows/component/accessControl";
export default class StatusBar {
  private readonly modalControl: HTMLElement;
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params: {}, emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  private pointControl: number = 0;
  private passwordCounter: number = 0;
  private inputPassword: string = '';
  private tentative: number = 1
 
  constructor() {
    const template = document.createElement('template');
    template.innerHTML = accessControl.trim(); 
    this.modalControl = template.content.firstChild as HTMLElement;
    this.init();
  }

  public init(): void {
    const checkPoint = document.querySelector("#pt_control") as HTMLElement;
    console.log(checkPoint)

    const modalButton = this.modalControl.querySelector(".btn-mle") as HTMLElement;
    const overlay = document.querySelector(".md-overlay") as HTMLElement;
    const digits = this.modalControl.querySelector("#digit") as HTMLElement;

    modalButton.addEventListener("click", () =>this.modalControlVisibility(false));
    overlay.addEventListener("click", () => this.modalControlVisibility(false));

    if (checkPoint) {
      checkPoint.addEventListener("click",this._checkPointClick.bind(this, checkPoint, digits));
    }
  }

  private _checkPointClick(checkPoint: HTMLElement, digits: HTMLElement): void  {
    this.pointControl += 1;

    if (this.pointControl === 1) {
      checkPoint.classList.add("crl_pos-1");
    } else if (this.pointControl === 2) {
      checkPoint.classList.remove("crl_pos-1");
      checkPoint.classList.add("crl_pos-2");
    } else if (this.pointControl === 3) {
      this.pointControl = 0;
      checkPoint.classList.remove("crl_pos-2");
      checkPoint.classList.add("crl_pos-0");

      this.modalControlVisibility(true);

      if (digits) {
        digits.addEventListener("click", this.handleDigitClick.bind(this));
      }
    }

    const resetDelay: number = 3000;
    setTimeout(() => {
      this.pointControl = 0;
      checkPoint.classList.remove("crl_pos-1", "crl_pos-2");
      checkPoint.classList.add("crl_pos-0");
    }, resetDelay);
  }

  private handleDigitClick(event: any): void {
    const indicator = document.querySelectorAll(".indicator-circle");

    if (event.target.tagName === "SPAN") {
        const circle = indicator[this.passwordCounter] as HTMLElement;

        if (this.passwordCounter < indicator.length) {
            this.inputPassword += event.target.id;
            circle.style.backgroundColor = "#ffff";
            this.passwordCounter++;
            
            if (this.passwordCounter === indicator.length) {
                if (this.inputPassword === '123456') {
                  this.modalControlVisibility(false);
                  this.tentative = 1;
                  StatusBar.CHANGE_SCREEN_EVENT.detail.set = 'settingsView';
                  StatusBar.CHANGE_SCREEN_EVENT.detail.params = "";
                  StatusBar.CHANGE_SCREEN_EVENT.detail.scope = "PAL_CRL";
                  StatusBar.CHANGE_SCREEN_EVENT.detail.emit = StatusBar.name;
                  document.dispatchEvent(StatusBar.CHANGE_SCREEN_EVENT);
                } else {
                  setTimeout(() => {
                    indicator.forEach(item => (item as HTMLElement).style.backgroundColor = "transparent");
                    indicator[0].parentElement!.classList.add('animate__animated', 'animate__shakeX');
                    this.tentative += 1
                    this.passwordCounter = 0;
                    this.inputPassword = '';
                    console.log(this.tentative)
                    this.tentative > 3 ? this.lockAccess() : '';
                  }, 500);
                  indicator[0].parentElement!.classList.remove('animate__animated', 'animate__shakeX');
                }
            }
        }
    }
}

  private modalControlVisibility(isOpen: boolean): void {
    const mleWrapper = document.querySelector(".mle-system-wrp");
    const overlay = document.querySelector(".md-overlay");
    const passwordWrapper = document.querySelector('.pass-indicator');

    if (mleWrapper && overlay && isOpen) {
      overlay.classList.remove("hidden");
      mleWrapper.classList.remove("hidden");
      mleWrapper.classList.remove('animate__animated',"animate__fadeOut","animate__faster");
      mleWrapper.classList.add('animate__animated',"animate__fadeIn","animate__faster");
      passwordWrapper!.classList.remove('animate__animated', 'animate__shakeX');
    }
    if (mleWrapper && overlay && !isOpen) {
      passwordWrapper!.classList.remove('animate__animated', 'animate__shakeX');
      this.passwordCounter = 0;
      this.inputPassword = '';
      mleWrapper.classList.remove('animate__animated',"animate__fadeIn","animate__faster");
      mleWrapper.classList.add('animate__animated',"animate__fadeOut","animate__faster");
      overlay.classList.add("hidden");
    }
  }

  public getStatusBarElement(): HTMLElement {
    return this.modalControl;
  }

  private lockAccess(){
      const modalDigits = document.querySelector('.digit-wrp')
      const antiForcePassword = document.querySelector('.anti-force-password')
    
      if(modalDigits && antiForcePassword){
        modalDigits.classList.add('v-hidden');
        antiForcePassword.classList.add('v-visible');
      }
  }
}
