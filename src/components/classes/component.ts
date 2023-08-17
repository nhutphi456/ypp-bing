import { Controller } from "./controller";

export class Component<T, U = T> {
  controller: Controller<T>;
  children?: Component<U>[];
  
  constructor(controller: Controller<T>, children?: Component<U>[]) {
    this.controller = controller;
    this.children = children;
  }

  updateData(data: T) {
    return this.controller.bindData(data);
  }
}
