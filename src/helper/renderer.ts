import { Component } from "../base/component";
import { Declaration } from "../types/declaration";
import { HtmlParser } from "./htmlParser";

export class Renderer {
  private htmlParser: HtmlParser;

  constructor() {
    this.htmlParser = new HtmlParser();
  }

  renderRoot(rootSelector: string, declaration: Declaration): string {
    document.body.innerHTML = `<${rootSelector}></${rootSelector}>`;

    this.traverse(document.body, declaration);

    return document.body.innerHTML;
  }

  private traverse(element: HTMLElement, declaration: Declaration): void {
    for (const key in declaration) {
      const elements = element.querySelectorAll(key);

      elements.forEach((child: HTMLElement) => {
        const componentClass = declaration[child.tagName];
        const instance = new componentClass();
        //parse data receive from parent component if any
        instance.data = JSON.parse(child.getAttribute("data"));

        const newChildElement = this.htmlParser.parseToHtmlElement(this.bindData(instance));
        this.replaceChild(child, newChildElement);
        this.traverse(newChildElement, declaration);
      });
    }
  }

  private replaceChild(element: HTMLElement, newElement: HTMLElement): void {
    const parentElement = element.parentNode;
    //functional program?
    [...newElement.children].forEach((child) => {
      parentElement.appendChild(child);
    });
    parentElement.removeChild(element);
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
