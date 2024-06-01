export default class HomeScreenView {
  title: string;
  buttonText: string;

  constructor({ title, buttonText }: { title: string; buttonText: string }) {
    this.title = title;
    this.buttonText = buttonText;
  }

  public renderTemplate(): string {
    return `
      <div class="home-view col">
        <h2>${this.title}</h2>
        <div class="home-view-photo-btn row">
          <div class="home-view-photo-btn-text">${this.buttonText}</div>
        </div>
      </div>
    `;
  }
}
