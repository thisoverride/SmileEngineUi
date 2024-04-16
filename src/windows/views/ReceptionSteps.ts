export default class ReceptionSteps {
  public receptionSteps: HTMLElement;
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params:'', emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  
  constructor(receptionSteps: HTMLElement,) {
    this.receptionSteps = receptionSteps;
    this.setup();
  }

  private setup(): void {
    const buttons: NodeListOf<HTMLButtonElement> = this.receptionSteps.querySelectorAll('button');

    buttons.forEach((button: HTMLButtonElement)=> {
      if(button.id === "printer"){
        button.addEventListener('click', this.openModal.bind(this));
      }
      if(button.id === "qrcode"){
        button.addEventListener('click', this.openModal.bind(this));
      }
      if(button.id === "home"){
        button.addEventListener('click', this.onClick.bind(this)); 
      }
      if(button.id === "modal-action"){
        button.addEventListener('click', this.closeModal.bind(this));
      }
    });
}

private openModal(e: Event): void {
    const target = (e.target as HTMLElement).id;
    const modal = document.querySelector('.modal-container');
    if (target === "printer" && modal) {
        const content = modal.querySelector('.qrcode') as HTMLElement | null;
        const contentToShow = modal.querySelector('.print') as HTMLElement | null;
        if (content && contentToShow) {
            content.style.display = 'none';
            contentToShow.style.display ='flex'
        }
        modal.classList.remove('v-hidden');
    }

    if(target === "qrcode" && modal){
        const content = modal.querySelector('.print') as HTMLElement | null;
        const contentToShow = modal.querySelector('.qrcode') as HTMLElement | null;
        if (content && contentToShow) {
            content.style.display = 'none'; 
            contentToShow.style.display = 'flex'
        }
        modal.classList.remove('v-hidden');
    }
}

private closeModal(): void { 
    const modal = document.querySelector('.modal-container');
    if(modal){
        modal.classList.add('v-hidden');
    }
}


  private onClick(): void {
    ReceptionSteps.CHANGE_SCREEN_EVENT.detail.set ="homeView"
    ReceptionSteps.CHANGE_SCREEN_EVENT.detail.params ='';
    ReceptionSteps.CHANGE_SCREEN_EVENT.detail.emit = ReceptionSteps.name;
    ReceptionSteps.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    document.dispatchEvent(ReceptionSteps.CHANGE_SCREEN_EVENT)
  }


  public getView(): this {
    return this
  }

  public getScreen(): HTMLElement {
    return this.receptionSteps;
  }
}
