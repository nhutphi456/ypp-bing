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
      const dataKey = element.getAttribute("data");
      if(!(dataKey in instance)) return
      element.setAttribute("data", JSON.stringify(instance[dataKey]));
    });

    // return super.handle(instance, componentHtml.outerHTML);
    return componentHtml.outerHTML
  }
}
