export default class ServiceUtils {

  protected buildHTMLElementFromString (htmlString: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString.trim();
    return wrapper;
  }

  protected htmlStringToNode (htmlString: string): DocumentFragment {
    const range = document.createRange();
    const fragment = range.createContextualFragment(htmlString.trim());
    return fragment;
  };
  
}