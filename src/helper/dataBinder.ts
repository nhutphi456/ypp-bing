import { Component } from "../base/component";
import { HtmlParser } from "./htmlParser";

export class DataBinder {
  private htmlParser: HtmlParser;
  constructor() {
    this.htmlParser = new HtmlParser();
  }

  bindData(instance: InstanceType<Component>): string {
    const view = this.interpolateText(instance);
    const componentHtml = this.bindDataToAttribute(instance, view);
    return componentHtml.outerHTML;
  }

  private bindDataToAttribute(instance: InstanceType<Component>, view: string): HTMLElement {
    const componentHtml = this.htmlParser.parseToHtmlElement(view);

    const elements = componentHtml.querySelectorAll("[data]");
    elements.forEach((element) => {
      const dataKey = element.getAttribute("data");
      element.setAttribute("data", JSON.stringify(instance[dataKey]));
    });

    return componentHtml;
  }

  private interpolateText(instance: InstanceType<Component>): string {
    let view = instance.constructor.getMetadata().template;

    for (const key in instance) {
      if (typeof instance[key] === "object") {
        for (const k in instance[key]) {
          view = view.replace(`{{${key}.${k}}}`, instance[key][k]);
        }
      } else {
        view = view.replace(`{{${key}}}`, instance[key]);
      }
    }

    return view;
  }
}
