import { Component } from "../base/component";

export class Renderer {
  private parser: DOMParser;
  private serializer: XMLSerializer;

  constructor() {
    this.parser = new DOMParser();
    this.serializer = new XMLSerializer();
  }

  renderRoot(
    rootComponentSelector: string,
    componentDictionary: { [key: string]: Component }
  ) {
    const component = componentDictionary[rootComponentSelector];
    const root = new component();

    document.body.innerHTML = `<${root.selector}></${root.selector}>`;
    this.traverse(document.body, componentDictionary);

    return document.body.innerHTML;
  }

  private traverse(
    element: HTMLElement,
    componentDictionary: { [key: string]: Component }
  ) {
    for (const key in componentDictionary) {
      const childElements = element.querySelectorAll(key);

      childElements.forEach((childElement) => {
        const componentClass =
          componentDictionary[childElement.tagName.toLowerCase()];
        const componentInstance = new componentClass();

        componentInstance.data = JSON.parse(childElement.getAttribute("data"));

        const newChildElement = this.parser.parseFromString(
          this.bindData(componentInstance),
          "text/html"
        ).body.firstChild as HTMLElement;

        const parentElement = childElement.parentNode;

        //functional program
        parentElement.appendChild(newChildElement);
        parentElement.removeChild(childElement);
        this.traverse(newChildElement, componentDictionary);
      });
    }
  }

  bindData(component) {
    let view = component.template;

    for (const key in component) {
      if (typeof component[key] === "object") {
        for (const k in component[key]) {
          view = view.replace(`{{${key}.${k}}}`, component[key][k]);
        }
      } else {
        view = view.replace(`{{${key}}}`, component[key]);
      }
    }

    
    const componentHtml = this.parser.parseFromString(view, "text/html")
      .body.firstChild as HTMLElement;

    const elements = componentHtml.querySelectorAll("[data]");
    elements.forEach((element) => {
      const dataKey = element.getAttribute("data");
      element.setAttribute("data", JSON.stringify(component[dataKey]));
    });

    const newView = this.serializer
      .serializeToString(componentHtml)
      .replace(/xmlns="[^"]+"/, "");

    return newView;
  }

  bindDataAttribute(component) {
    
  }
}
