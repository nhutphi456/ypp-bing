import { Component } from "../base/component";

export class Renderer {
  private parser: DOMParser;
  constructor() {
    this.parser = new DOMParser();
  }

  renderRoot(
    rootComponentSelector: string,
    componentDictionary: { [key: string]: Component }
  ) {
    const component = componentDictionary[rootComponentSelector];
    const root = new component();

    document.body.innerHTML = this.interpolate(root);
    this.traverse(document.body, componentDictionary);

    return document.body.innerHTML;
  }

  private traverse(
    element: HTMLElement,
    componentDictionary: { [key: string]: Component }
  ) {
    for (const key in componentDictionary) {
      const childElements = element.querySelectorAll(key);

      childElements.forEach((element) => {
        const componentClass =
          componentDictionary[element.tagName.toLowerCase()];
        const componentInstance = new componentClass();
        const newElement = this.parser.parseFromString(
          this.interpolate(componentInstance),
          "text/html"
        ).body.firstChild as HTMLElement;

        //TODO
        // const data = newElement.getAttribute("data")
        // if(data) {

        // }

        const parentElement = element.parentNode;

        //functional program
        parentElement.appendChild(newElement);
        parentElement.removeChild(element);
        this.traverse(newElement, componentDictionary);
      });
    }
  }

  private interpolate(component) {
    let view = component.template;
    for (let key in component) {
      view = view.replace(`{{${key}}}`, component[key]);
    }
    return view;
  }
}
