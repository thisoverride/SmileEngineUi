import DOMService from "../utils/DOMService";
import StatusBar from "../components/StatusBar";
import { statusBar } from "../windows/component/statusBar";


export default class PanelService {
  private readonly _domService: DOMService;
  private readonly statusBar: StatusBar;
  

  constructor(domService: DOMService) {
    this._domService = domService;
    this.statusBar = new StatusBar(this._domService.createDocumentFragmentFromHTML(statusBar));
  }


  public mountPanelAccess(): DocumentFragment {
    const accessPanel = this.statusBar.getStatusBarElement();
    return accessPanel;
  }

}
