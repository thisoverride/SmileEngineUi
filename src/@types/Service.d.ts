interface DOMServiceInterface {
  createHTMLElementFromString(htmlString: string): HTMLDivElement;
  createDocumentFragmentFromHTML(htmlString: string): DocumentFragment;
}

export interface CameraCommand {
  context : string;
  body?: string[]
}