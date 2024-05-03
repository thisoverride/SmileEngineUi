import DOMService from "../utils/DOMService";
import { adminLayout } from "../windows/screens/layout/admin.layout";
import { settingsScreen } from "../windows/screens/settingsScreen";


export default class PanelService {
  private readonly _domService: DOMService;
  

  constructor(domService: DOMService) {
    this._domService = domService;
  }


  public mountPanelAccess(event: any) {
    const screens = this._domService.stringToHTMLElement(adminLayout(settingsScreen))
    return screens

  }

}
