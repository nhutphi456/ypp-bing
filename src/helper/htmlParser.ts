export class HtmlParser {
  private parser: DOMParser;

  constructor() {
    this.parser = new DOMParser();
  }
  
  parseToHtmlElement(htmlString: string): HTMLElement {
    return this.parser.parseFromString(htmlString, "text/html").body
      .firstChild as HTMLElement;
  }
}
