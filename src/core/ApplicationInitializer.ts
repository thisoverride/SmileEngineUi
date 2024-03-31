import NavigationController from "../controllers/NavigationController";

export default class ApplicationInitializer {
  private _navigationController: NavigationController
  private _socket: WebSocket;
  private connectionAttempts: number = 0;
  private maxAttempts: number = 3;
  private connectionTimeout: number = 5000


  constructor(navigationController: NavigationController){
    this._navigationController = navigationController;
    this._socket = new WebSocket('ws://192.168.1.52:3000');
    this._socket.addEventListener('error', this.handleWebSocketError.bind(this));
    this._socket.addEventListener('close', this.handleWebSocketClose.bind(this));
    this._socket.addEventListener('open', this.handleWebSocketOpen.bind(this));
    this._socket.addEventListener('message', this.handleWebSocketMessage.bind(this));
  }

  public initialize() {
    console.log(this._socket)
      const root: HTMLElement | null = document.getElementById('root');
      const applicationContainer: HTMLDivElement = document.createElement('div');
      applicationContainer.id= 'app';
      const systemControl : HTMLElement = document.createElement('div');
      systemControl.id = 'system-control';
  
      if(root){
        root.appendChild(systemControl);
        root.appendChild(applicationContainer);
        this._navigationController.renderDefautlView()
      } else {
        throw new Error('Cannot be access to root element')
      }
    }

    private handleWebSocketOpen(event: Event) {
      console.log('WebSocket connection established');
      // Vous pouvez ajouter ici d'autres actions à effectuer lors de l'ouverture de la connexion WebSocket
    }
  
    private handleWebSocketMessage(event: MessageEvent) {
      console.log('Message received from WebSocket server:', event.data);
      // Vous pouvez ajouter ici d'autres actions à effectuer lors de la réception de messages du serveur WebSocket
    }
  
    private handleWebSocketError(event: Event) {
      console.error('WebSocket connection error:', event);
      // Tentative de reconnexion si le nombre de tentatives n'a pas encore atteint le maximum
      if (this.connectionAttempts < this.maxAttempts) {
        this.connectionAttempts++;
        setTimeout(this.connectWebSocket.bind(this), 3000);
      } else {
        throw new Error('Maximum number of connection attempts reached. Unable to connect.');
      }
    }
  
    private handleWebSocketClose(event: CloseEvent) {
      console.log('WebSocket connection closed');
      // Tentative de reconnexion si le nombre de tentatives n'a pas encore atteint le maximum
      if (this.connectionAttempts < this.maxAttempts) {
        this.connectionAttempts++;
        setTimeout(this.connectWebSocket.bind(this), 3000);
      } else {
        console.error('Maximum number of connection attempts reached. Unable to connect.');
      }
    }
  
    private connectWebSocket() {
      console.log(`Attempting to connect to WebSocket (${this.connectionAttempts + 1}/${this.maxAttempts})...`);
      this._socket = new WebSocket('ws://192.168.1.52:3000');
      setTimeout(() => {
        if (this._socket.readyState !== WebSocket.OPEN) {
          // Fermer la connexion WebSocket si elle n'est pas encore ouverte après le timeout
          this._socket.close();
          // Lancer une exception si la connexion WebSocket n'a pas réussi dans le délai imparti
          throw new Error('WebSocket connection timeout. Unable to connect.');
        }
      }, this.connectionTimeout);
      this._socket.addEventListener('error', this.handleWebSocketError.bind(this));
      this._socket.addEventListener('close', this.handleWebSocketClose.bind(this));
      this._socket.addEventListener('open', this.handleWebSocketOpen.bind(this));
      this._socket.addEventListener('message', this.handleWebSocketMessage.bind(this));
    }
}
