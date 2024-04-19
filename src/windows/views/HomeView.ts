import { Socket } from "socket.io-client";

export default class HomeView {
  private homeView: HTMLElement;

  constructor(homeScreen: HTMLElement, socket: Socket) {
    this.homeView = homeScreen;
    socket.on('create-session',(event: any) => {
      console.log(event)
    })
    socket.emit('create-session',{data: "create-session"});

  }

  public getScreen(): HTMLElement {
    return this.homeView;
  }
}
