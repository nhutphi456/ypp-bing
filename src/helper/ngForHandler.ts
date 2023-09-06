import { Component } from "../interfaces/component";
import { ViewHandler } from "../interfaces/viewHandler";

export class NgForHandler extends ViewHandler {
  constructor() {
    super();
  }

  public handle(instance: InstanceType<Component>, view: string): string {
     //1. detect ngFor
    //2. loop through data and create selector
    //3. bind data to that selector
    return super.handle(instance, view)
  }
}
