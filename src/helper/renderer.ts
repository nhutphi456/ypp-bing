import { from } from "rxjs";
import { bootstrap } from "../base/injector";
import { Declaration } from "../types/declaration";
import { parseToHtmlElement } from "../utils/parsetoHtmlElement";

export class Renderer {
  constructor() {}

  // renderRoot(rootSelector: string, declaration: Declaration): string {
  //   const root = document.getElementById("root");

  //   root.innerHTML = `<${rootSelector}></${rootSelector}>`;
  //   this.traverse(root, declaration);

  //   return root.innerHTML
  // }

  async renderRoot(rootSelector: string, declaration: Declaration): Promise<string> {
    const root = document.getElementById("root");

    root.innerHTML = `<${rootSelector}></${rootSelector}>`;
    await this.traverse2(root, declaration);

    return root.innerHTML
  }

  private traverse(element: HTMLElement, declaration: Declaration): void {
    const elementObs = from([...element.children]);
    let elChildren: HTMLCollection;

    elementObs.subscribe(async (el: HTMLElement) => {
      if (el.tagName in declaration) {
        const componentClass = declaration[el.tagName];
        const instance = bootstrap(componentClass);
        const parent = el.parentNode;

        // if (!parent) return;
        instance.data = JSON.parse(el.getAttribute("data") ?? "{}"); //parse data receive from parent component if any

        const elViewString = await instance.render();
        const newEl = parseToHtmlElement(elViewString);

        this.replaceChildren(newEl, el);
        elChildren = parent.children;
      } else {
        elChildren = el.children;
      }

      from([...elChildren]).subscribe((e: HTMLElement) => {
        this.traverse(e, declaration);
      });
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

  private async traverse2(element: HTMLElement, declaration: Declaration): Promise<void> {
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
      this.traverse2(el, declaration);
    });
  }
}
