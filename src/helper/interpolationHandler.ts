import { Component } from "../interfaces/component";
import { ViewHandler } from "../interfaces/viewHandler";

export class InterpolationHandler extends ViewHandler {
  constructor() {
    super();
  }

  public handle(instance: InstanceType<Component>, view: string): string {
    // for (const prop in instance) {
    //   if (typeof instance[prop] === "object") {
    //     for (const k in instance[prop]) {
    //       view = view.replace(`{{${prop}.${k}}}`, instance[prop][k]);
    //     }
    //   } else {
    //     view = view.replace(`{{${prop}}}`, instance[prop]);
    //   }
    // }

    view = view.replace(/{{(.*?)}}/g, (match, key) => {
      console.log({ key });
      const keys = key.split(".");
      let value = instance;
      for (const k of keys) {
        value = value[k];
        if (value === undefined) return match; // Return the placeholder if the value is undefined
        console.log({ value });
      }
      return String(value); // Ensure the value is treated as a string
    });

    return super.handle(instance, view);
  }
}
