import { CameraView, CaptureModeSelectionView, PhotoOrientationView } from "../../views/main/views";


export default class NavigationView {

  public changeView(target: string): void {


    switch (target) {
      case 'captureModeSelectionView':
        window.app.setMain(new CaptureModeSelectionView().render());
        break;
      case 'PhotoOrientationViewScreen':
        window.app.setMain(new PhotoOrientationView().render());
        break;
      case 'CameraViewScreen':
        window.app.setMain(new CameraView().render());
        break;
      default:
        throw new Error(`${target} is not a view`);
    }

  }

}