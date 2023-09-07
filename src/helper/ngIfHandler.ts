import { NGIF_ATTRIBUTE } from "../constant";
import { Component } from "../interfaces/component";
import { ViewHandler } from "../interfaces/viewHandler";
import { HtmlParser } from "./htmlParser";

export class NgIfHandler extends ViewHandler {
  private htmlParser: HtmlParser;
  constructor() {
    super();
    this.htmlParser = new HtmlParser();
  }
  public handle(instance: InstanceType<Component>, view: string): string {
    const element = this.htmlParser.parseToHtmlElement(view);

    [...element.children].forEach((child: HTMLElement) => {
      const attributes = child.attributes;
      const ngIfExpression = attributes.getNamedItem(NGIF_ATTRIBUTE);
      if (ngIfExpression) {
        const ngIfValue = ngIfExpression.value;
        const keys = ngIfValue.split(".");
        let value = instance;
        for (const k of keys) {
          value = value[k];
        }

        if (!value) {
          child.remove();
        }
        
      }
    });

    view = element.outerHTML;

    return view;
  }
}
