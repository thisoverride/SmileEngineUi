interface DOMServiceInterface {
  createHTMLElementFromString(htmlString: string): HTMLDivElement;
  createDocumentFragmentFromHTML(htmlString: string): DocumentFragment;
}