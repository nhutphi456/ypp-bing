import { bootstrap } from "../base/injector";
import { Declaration } from "../types/declaration";
import { parseToHtmlElement } from "../utils/parsetoHtmlElement";

export class Renderer {
  constructor() {}

  renderRoot(rootSelector: string, declaration: Declaration): string {
    document.body.innerHTML = `<${rootSelector}></${rootSelector}>`;
    this.traverse2(document.body, declaration);
    return document.body.innerHTML;
  }

  //deprecated
  private traverse(element: HTMLElement, declaration: Declaration): void {
    for (const key in declaration) {
      const elements = element.querySelectorAll(key);

      elements.forEach((element: HTMLElement) => {
        const componentClass = declaration[element.tagName];
        const instance = bootstrap(componentClass);
        //parse data receive from parent component if any
        instance.data = JSON.parse(element.getAttribute("data") ?? "{}");

        element.outerHTML = instance.render();

        [...element.children].forEach((child: HTMLElement) => {
          this.traverse(child, declaration);
        });
      });
    }
  }

  private traverse2(element: HTMLElement, declaration: Declaration): void {
    let elChildren: HTMLCollection;

    if (element.tagName in declaration) {
      const componentClass = declaration[element.tagName];
      const instance = bootstrap(componentClass);

      instance.data = JSON.parse(element.getAttribute("data") ?? "{}"); //parse data receive from parent component if any

      const newEl = parseToHtmlElement(instance.render());

      this.replaceChildren(newEl, element);
      elChildren = newEl.children;
    } else {
      elChildren = element.children;
    }

    [...elChildren].forEach((el: HTMLElement) => {
      this.traverse2(el, declaration);
    });
  }

  private replaceChildren(newElement: HTMLElement, element: HTMLElement) {
    const parent = element.parentNode;
    const elementIdx = [...parent.children].indexOf(element);

    parent.insertBefore(newElement, parent.children[elementIdx]);
    parent.removeChild(element);
  }
}
