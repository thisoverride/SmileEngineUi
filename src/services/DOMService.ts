export default class DOMService {
  public createHTMLElementFromString(htmlString: string, id?: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    
    typeof id !== 'undefined' ? wrapper.id = id : '';

    wrapper.innerHTML = htmlString.trim();
    return wrapper;
  }

  public createDocumentFragmentFromHTML(htmlString: string): DocumentFragment {
    const range = document.createRange();
    const fragment = range.createContextualFragment(htmlString.trim());
    return fragment;
  }
}
