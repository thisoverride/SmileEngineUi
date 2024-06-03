import HomeScreenView from "./screenView/HomeScreenView";

export default class HomeView extends HomeScreenView {
  private _handleClick: () => void;

  constructor(data: any) {
    super(data);
    this._handleClick = this._handleClickFunction.bind(this);
  }

  public render(): HTMLElement {
    const template = document.createElement('template');
    template.innerHTML = super.renderTemplate();
    const element = template.content.firstElementChild as HTMLElement;
    this._intView();
    return element;
  }

  public _intView(): void {
    const appElement = document.getElementById('app')!;
    appElement.addEventListener('click', this._handleClick);
  }

  private _handleClickFunction(): void {
    window.navigation.changeView('captureModeSelectionView');
    this._removeClickListener();
  }

  private _removeClickListener(): void {
    const appElement = document.getElementById('app')!;
    appElement.removeEventListener('click', this._handleClick);
  }
}
