import DOMService from "../utils/DOMService";
import StatusBar from "../components/StatusBar";
import { statusBar } from "../windows/component/statusBar";


export default class PanelService {
  private readonly _domService: DOMService;
  private  statusBar: StatusBar | null = null;
  

  constructor(domService: DOMService) {
    this._domService = domService;
  }


  public mountPanelAccess(): DocumentFragment {
    const accessPanel = this._domService.createDocumentFragmentFromHTML(statusBar)
    this.statusBar = new StatusBar(accessPanel);
    return this.statusBar.getStatusBarElement()
  }

}
