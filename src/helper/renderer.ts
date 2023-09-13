import { bootstrap } from "../base/injector";
import { AppModule } from "../controller/appModule";
import { Declaration } from "../types/declaration";
import { parseToHtmlElement } from "../utils/parsetoHtmlElement";

export class Renderer {
  constructor() {}

  renderRoot(rootSelector: string, declaration: Declaration): string {
    document.body.innerHTML = `<${rootSelector}></${rootSelector}>`;
    this.traverse(document.body, declaration);
    return document.body.innerHTML;
  }

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

  render(el: HTMLElement, container: HTMLElement) {
    const componentClass = AppModule.declaration[el.tagName];

    if (componentClass) {
      const instance = bootstrap(componentClass);

      instance.data = JSON.parse(el.getAttribute("data") ?? "{}");

      console.log({ instance });
      const newEl = parseToHtmlElement(instance.render());

      el.remove();

      [...newEl.children].forEach((child: HTMLElement) => {
        container.appendChild(child);
        [...child.children].forEach((e: HTMLElement) => {
          this.render(e, child);
        });
      });
    } else {
      [...el.children].forEach((e: HTMLElement) => {
        this.render(e, el);
      });
    }
  }
}
