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
      const dataAttrValue = element.getAttribute("data");
      const keys = dataAttrValue.split(".")
      
      if(keys[0] in instance) {
        const value = eval(`instance.${dataAttrValue}`)
        
        element.setAttribute("data", JSON.stringify(value))
      }
    });

    return super.handle(instance, componentHtml.innerHTML);
  }
}
