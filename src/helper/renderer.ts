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
      
      elements.forEach((element: HTMLElement) => {
        console.log("rendererTagName " + element.tagName)
        const componentClass = declaration[element.tagName];
        const instance = bootstrap(componentClass);
        //parse data receive from parent component if any
        instance.data = JSON.parse(element.getAttribute("data"));

        element.outerHTML = instance.render();

        [...element.children].forEach((child: HTMLElement) => {
          this.traverse(child, declaration);
        });
      });
    }
  }
}
