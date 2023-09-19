import { bootstrap } from "../base/injector";
import { Declaration } from "../types/declaration";
import { isNativeHTMLTag } from "../utils/isNativeTag";
import { parseToHtmlElement } from "../utils/parsetoHtmlElement";
import { from, of } from "rxjs";

export class Renderer {
  constructor() {}

  renderRoot(rootSelector: string, declaration: Declaration): Promise<string> | any {
    document.body.innerHTML = `<${rootSelector}></${rootSelector}>`;
    // await this.traverse(document.body, declaration);
    this.traverse2(document.body, declaration);
    return document.body.innerHTML;
  }

  private async traverse(element: HTMLElement, declaration: Declaration): Promise<void> {
    let elChildren: HTMLCollection;

    if (element.tagName in declaration) {
      const componentClass = declaration[element.tagName];
      const instance = bootstrap(componentClass);
      const parent = element.parentNode;
      if (!parent) return;

      instance.data = JSON.parse(element.getAttribute("data") ?? "{}"); //parse data receive from parent component if any

      const elViewString = await instance.render();
      const newEl = parseToHtmlElement(elViewString);

      this.replaceChildren(newEl, element);
      elChildren = parent.children;
    } else {
      elChildren = element.children;
    }

    [...elChildren].forEach((el: HTMLElement) => {
      this.traverse(el, declaration);
    });
  }

  private replaceChildren(newElement: HTMLElement, element: HTMLElement) {
    const parent = element.parentNode;

    if (parent) {
      let elementIdx = [...parent.children].indexOf(element);

      [...newElement.children].forEach((el: HTMLElement) => {
        parent.insertBefore(el, parent.children[elementIdx]);
        elementIdx++;
      });

      parent.removeChild(element);
    }
  }

  private traverse2(element: HTMLElement, declaration: Declaration): void {
    const elObs = from([...element.children]);

    elObs.subscribe(async (el: HTMLElement) => {
      if (el.tagName in declaration) {
        const componentClass = declaration[el.tagName];
        const instance = bootstrap(componentClass);

        instance.data = JSON.parse(el.getAttribute("data") ?? "{}"); //parse data receive from parent component if any
        el.innerHTML = await instance.render();
      }
      from([...el.children]).subscribe((e: HTMLElement) => {
        this.traverse2(e, declaration);
      });
    });
  }
}
