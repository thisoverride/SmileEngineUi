import ElectronApp from "./framework/ElectronApp";
import EventService from "./framework/service/EventService";

const electronApp =  new ElectronApp(new EventService())
electronApp.start();
