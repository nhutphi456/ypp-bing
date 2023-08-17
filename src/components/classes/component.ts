import { Controller } from "./controller";

export class Component<T> {
  controller: Controller<T>;
  children?: Component<any>[]
  constructor(controller: Controller<T>, children?: Component<any>[]) {
    this.controller = controller;
    this.children = children
  }

  updateData(data: T) {
    this.controller.bindData(data);
  }
}
