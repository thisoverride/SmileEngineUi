interface ModalOptions {
  title: string;
  content: string | HTMLElement;
}

export default class Modal {
  private modalElement: HTMLElement;
  public isReset: boolean = true

  constructor(modalId: string) {
    this.modalElement = document.getElementById(modalId)!;
    this.setupCloseButton();
  }

  private setupCloseButton() {
    const closeButton = this.modalElement.querySelector('.md-close');
    if (closeButton) {
      closeButton.addEventListener('click', this.hide.bind(this));
    }
  }

  public show(options: ModalOptions) {
    const { title, content } = options;
    const titleElement = this.modalElement.querySelector('._md-title');
    const contentElement = this.modalElement.querySelector('.md-body');
    
    if (titleElement && contentElement) {
      titleElement.innerHTML = title;

      if (typeof content === 'string') {
        contentElement.innerHTML = content;
      } else {
        contentElement.innerHTML = '';
        contentElement.appendChild(content);
      }

      this.modalElement.classList.add('md-show');
    }
  }

  public hide() {
    this.modalElement.classList.remove('md-show');
    this.isReset = false
  }
}

