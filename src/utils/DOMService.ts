export default class DOMService {
  public createHTMLElementFromString(htmlString: string, id?: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    
    typeof id !== 'undefined' ? wrapper.id = id : '';

    wrapper.innerHTML = htmlString.trim();
    return wrapper;
  }


  public stringToHTMLElement(htmlString: string){
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim(); 
    return template.content.firstChild as HTMLElement;
  }

  public createDocumentFragmentFromHTML(htmlString: string): DocumentFragment {
    const range = document.createRange();
    const fragment = range.createContextualFragment(htmlString.trim());
    return fragment;
  }

  public render(childElement: DocumentFragment | HTMLElement, cleanParent?: Boolean){
    const app = document.getElementById('app');
    if(app){
      if(cleanParent){
        app.innerHTML = ""; 
        app.appendChild(childElement);
      }else{
        app.appendChild(childElement);
      }
    }
  }
}
