import { Component } from "../interfaces/component";
import { ViewHandler } from "../interfaces/viewHandler";
import { HtmlParser } from "./htmlParser";

export class BindAttributeHandler extends ViewHandler {
  private htmlParser: HtmlParser;

  constructor() {
    super();
    this.htmlParser = new HtmlParser();
  }

  public handle(instance: InstanceType<Component>, view: string): string {
    const componentHtml = this.htmlParser.parseToHtmlElement(view);

    const elements = componentHtml.querySelectorAll("[data]");
    elements.forEach((element) => {
      const dataProperty = element.getAttribute("data");
      if (dataProperty in instance) {
        element.setAttribute("data", JSON.stringify(instance[dataProperty]));
      }
    });

    return super.handle(instance, componentHtml.outerHTML);
  }
}