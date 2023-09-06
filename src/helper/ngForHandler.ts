import { Component } from "../interfaces/component";
import { ViewHandler } from "../interfaces/viewHandler";
import { HtmlParser } from "./htmlParser";

export class NgForHandler extends ViewHandler {
  private htmlParser: HtmlParser;
  constructor() {
    super();
    this.htmlParser = new HtmlParser();
  }

  public handle(instance: InstanceType<Component>, view: string): string {
    //1. detect ngFor
    //2. loop through data and create selector
    //3. bind data to that selector
    const element = this.htmlParser.parseToHtmlElement(view);

    [...element.children].forEach((child: HTMLElement) => {
      const attributes = child.attributes;
      const ngForExpression = attributes.getNamedItem("*ngFor")?.value;
      if (!ngForExpression) return;
      const words = ngForExpression.split(" ");
      const list = words[3];
      // const list = ngForExpression.split(" ")[3];

      instance[list].forEach((item) => {
        const newElement = child.cloneNode(true) as HTMLElement;
        newElement.setAttribute("data", JSON.stringify(item));
        newElement.removeAttribute("*ngFor");
        element.appendChild(newElement);
        child.remove()
      });
    });

    view = element.outerHTML;

    return super.handle(instance, view);
  }
}
