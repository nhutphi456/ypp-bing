import { Component } from "../interfaces/component";
import { ViewHandler } from "../interfaces/viewHandler";

export class InterpolationHandler extends ViewHandler {
  constructor() {
    super();
  }
  public handle(instance: InstanceType<Component>, template: string): string {
    for (const prop in instance) {
      if (typeof instance[prop] === "object") {
        for (const k in instance[prop]) {
          template = template.replace(`{{${prop}.${k}}}`, instance[prop][k]);
        }
      } else {
        template = template.replace(`{{${prop}}}`, instance[prop]);
      }
    }

    return super.handle(instance, template);
    return template;
  }
}
