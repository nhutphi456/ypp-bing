import { Component } from "../base/component";
import { HtmlParser } from "./htmlParser";

export class ViewBuilder {
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
  /**
   * @param instance object of component 
   * @returns 
   */

  private interpolateText(instance: InstanceType<Component>): string {
    let view = instance.getMetadata().template;

    for (const prop in instance) {
      if (typeof instance[prop] === "object") {
        for (const k in instance[prop]) {
          view = view.replace(`{{${prop}.${k}}}`, instance[prop][k]);
        }
      
      } else {
        view = view.replace(`{{${prop}}}`, instance[prop]);
      }
    }

    return view;
  }

  bindNgFor(element: HTMLElement) {
    //1. detect ngFor
    //2. loop through data and create selector
    //3. bind data to that selector
    const attributes = element.attributes;

    const ngForExpression = attributes.getNamedItem("*ngFor")?.value;
    const words = ngForExpression.split(" ");
    const list = words[3];
    let testObj = {}
    testObj[list].forEach((item) => {
        const newElement = element.cloneNode(true) as HTMLElement
        newElement.setAttribute("data", JSON.stringify(item))
        newElement.removeAttribute("*ngFor")
        element.appendChild(newElement)
        // element.removeChild(childElement)
    });
  }

  // bindAttribute(instance: InstanceType<Component>, element: HTMLElement): void {
  //   [...element.children].forEach((child) => {
  //     const attributes = child.attributes;
  //     for (const key in attributes) {
  //       if (key.startsWith("[") && key.endsWith("]")) {
  //         const dataKey = attributes[key];
  //         child.setAttribute(key, JSON.stringify({}));
  //       }
  //     }
  //   });
  // }
}
