import { bootstrap } from "../base/injector";
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
        const instance = bootstrap(componentClass);
        //parse data receive from parent component if any
        instance.data = JSON.parse(child.getAttribute("data"));

        const newChildElement = this.htmlParser.parseToHtmlElement(instance.render());
        this.replaceChild(child, newChildElement);
        this.traverse(newChildElement, declaration);
      });
    }
  }

  private replaceChild(element: HTMLElement, newElement: HTMLElement): void {
    const parentElement = element.parentNode;

    [...newElement.children].forEach((child) => {
      parentElement.appendChild(child);
    });

    parentElement.removeChild(element);
  }
}
