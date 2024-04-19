import { Socket } from "socket.io-client";

export default class HomeView {
  private homeView: HTMLElement;

  constructor(homeScreen: HTMLElement, socket: Socket) {
    this.homeView = homeScreen;
    socket.on('create-session',(event: any) => {
      if(event.warning){
        this.setup(event);
      }
    })
    socket.emit('create-session',{data: "create-session"});
  }

  private setup(event: any): void {
    const modal = this.homeView.querySelector('.modal-container') as HTMLElement;
    modal.classList.remove('v-hidden')
    const boy = modal.querySelector('.modal-body') as HTMLElement;

    boy.innerHTML = event.warning
     
  }

  public getScreen(): HTMLElement {
    return this.homeView;
  }
}
