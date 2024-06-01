import { mainLayout } from "../views/layouts/mainLayout";

export default class layoutManager {
  private _container: HTMLElement;

  constructor(containerElement: HTMLElement, config : any) {
    this._container = containerElement;
    this._applyPreference(config)
  }

  private _applyPreference(config : any): void {
    const prefThemeId:number = config.application.prefereces.theme;
    const themeColor = config.application.themes.find((t: { id: number; }) => t.id === prefThemeId);
    if(themeColor){
      document.documentElement.style.setProperty('--bg-color', themeColor.colors.backgroundColor);
      document.documentElement.style.setProperty('--text-color', themeColor.colors.fontColor);
    }
  }

  public render(): void {
    this._container.innerHTML = mainLayout();
  }


  public changeTitle(title: string) {
    this.updateElementText('main-title', title);
  }
  public clearTitle(): void {
    this.updateElementText('main-title', '');
  }
  public clear(element: string): void {
    document.querySelector(element)!.innerHTML ='';
  }

  public hideHeader(): void {
    const header = document.querySelector('.layout-header')
    if(header && !header.classList.contains('hidden')){
      header.classList.add('hidden')
    }

  }
  public setHeader(title: HTMLElement): void {
    this._udpateElement('.layout-header', title);
  }

  public setMain(title: HTMLElement): void {
    this._udpateElement('#body', title);
  }

  public setFooter(title: HTMLElement): void {
    this._udpateElement('.layout-footer', title);
  }

  private updateElementText(elementId: string, text: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      throw new Error(`Element with ID ${elementId} not found`);
    }
  }

  private _udpateElement(el: string, val: HTMLElement): void {
    const element = document.querySelector(el);
    if(element) {
      element.innerHTML = '';
      element.appendChild(val)
    }else {
      throw new Error(`Element with ID ${element} not found`);
    }
  }
}