import { Component } from "../interfaces/component";
import { ViewHandler } from "../interfaces/viewHandler";

export class InterpolationHandler extends ViewHandler {
  constructor() {
    super();
  }
  
  public handle(instance: InstanceType<Component>, view: string): string {
    for (const prop in instance) {
      if (typeof instance[prop] === "object") {
        for (const k in instance[prop]) {
          view = view.replace(`{{${prop}.${k}}}`, instance[prop][k]);
        }
      } else {
        view = view.replace(`{{${prop}}}`, instance[prop]);
      }
    }

    return super.handle(instance, view);
  }
}
