import { Component } from "../base/component";
import { HtmlParser } from "./htmlParser";
import { ReflectHelper } from "./reflectHelper";

export class Renderer {
  private reflectHelper: ReflectHelper;
  private htmlParser: HtmlParser;

  constructor() {
    this.reflectHelper = new ReflectHelper();
    this.htmlParser = new HtmlParser();
  }

  renderRoot(
    rootComponentSelector: string,
    declaration: { [key: string]: Component }
  ): string {
    document.body.innerHTML = `<${rootComponentSelector}></${rootComponentSelector}>`;

    this.traverse(document.body, declaration);

    return document.body.innerHTML;
  }

  private traverse(
    element: HTMLElement,
    declaration: { [key: string]: Component }
  ): void {
    for (const key in declaration) {
      const elements = element.querySelectorAll(key);

      elements.forEach((child: HTMLElement) => {
        const componentClass =
          declaration[child.tagName];
        const componentInstance = new componentClass();
        //parse data receive from parent component if any
        componentInstance.data = JSON.parse(child.getAttribute("data"));

        const newChildElement = this.htmlParser.parseToHtmlElement(
          this.bindData(componentInstance)
        );
        this.replaceChild(child, newChildElement);
        this.traverse(newChildElement, declaration);
      });
    }
  }

  private replaceChild(
    childElement: HTMLElement,
    newChildElement: HTMLElement
  ): void {
    const parentElement = childElement.parentNode;
    //functional program
    parentElement.appendChild(newChildElement);
    parentElement.removeChild(childElement);
  }

  bindData(componentInstance: InstanceType<Component>): string {
    const view = this.interpolateText(componentInstance);
    const componentHtml = this.bindDataToAttribute(componentInstance, view);
    return componentHtml.outerHTML;
  }

  private bindDataToAttribute(
    componentInstance: InstanceType<Component>,
    view: string
  ): HTMLElement {
    const componentHtml = this.htmlParser.parseToHtmlElement(view);

    const elements = componentHtml.querySelectorAll("[data]");
    elements.forEach((element) => {
      const dataKey = element.getAttribute("data");
      element.setAttribute("data", JSON.stringify(componentInstance[dataKey]));
    });

    return componentHtml;
  }

  private interpolateText(componentInstance: InstanceType<Component>): string {
    let view = componentInstance.constructor.getMetadata().template;

    for (const key in componentInstance) {
      if (typeof componentInstance[key] === "object") {
        for (const k in componentInstance[key]) {
          view = view.replace(`{{${key}.${k}}}`, componentInstance[key][k]);
        }
      } else {
        view = view.replace(`{{${key}}}`, componentInstance[key]);
      }
    }

    return view;
  }
}
