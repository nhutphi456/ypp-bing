import { NGFOR_ATTRIBUTE } from "../constant";
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
      const ngForExpression = attributes.getNamedItem(NGFOR_ATTRIBUTE);
      if (ngForExpression) {
        const dataProperty = this.getDataProperty(ngForExpression);

        instance[dataProperty].forEach((item) => {
          const newElement = child.cloneNode(true) as HTMLElement;
          newElement.setAttribute("data", JSON.stringify(item));
          newElement.removeAttribute(NGFOR_ATTRIBUTE);
          element.appendChild(newElement);
          child.remove();
        });
      }
    });

    view = element.outerHTML;

    return super.handle(instance, view);
  }

  /**
   * @ComponentMetadata({
   *   selector: "parent-component",
   *   template: `<div>{{title}}</div><child-component *ngFor="let item of list" data="item"></child-component>`
   * })
   *  class ParentComponent extends BaseComponent {
   *  title = "Hello from parent"
   *  channel = "VTC"
   *  list = ["item 1", "item 2", "item 3"]
   * }
   * @param ngForExpression *ngFor="let item of list"
   * @returns list
   */
  private getDataProperty(ngForExpression: Attr) {
    const value = ngForExpression.value;
    const arr = value.split(" ");
    const dataProperty = arr[arr.length - 1];
    return dataProperty;
  }
}
