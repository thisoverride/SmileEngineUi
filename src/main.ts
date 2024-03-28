import WindowService from './services/WindowService';
import DOMService from './services/DOMService';
import './windows/styles/normalize.css';
import './windows/styles/helpers.css';
import './windows/styles/style.css';
import 'boxicons'
import NavigationController from "./controllers/NavigationController";
import ApplicationInitializer from './core/ApplicationInitializer';

const main = () => {
    const domService = new DOMService();
    const windowService = new WindowService(domService);
    const navigationController = new NavigationController(windowService);
    const applicationInitializer = new ApplicationInitializer(navigationController);
    applicationInitializer.initialize()
}

main();
