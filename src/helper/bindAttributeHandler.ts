import { Component } from "../interfaces/component";
import { ViewHandler } from "../interfaces/viewHandler";
import { parseToHtmlElement } from "../utils/parsetoHtmlElement";

export class BindAttributeHandler extends ViewHandler {
  constructor() {
    super();
  }

  public handle(instance: InstanceType<Component>, view: string): string {
    const componentHtml = parseToHtmlElement(view);

    const elements = componentHtml.querySelectorAll("[data]");
    elements.forEach((element) => {
      const dataProperty = element.getAttribute("data");
      if (dataProperty in instance) {
        element.setAttribute("data", JSON.stringify(instance[dataProperty]));
      }
    });

    return super.handle(instance, componentHtml.innerHTML);
  }
}
