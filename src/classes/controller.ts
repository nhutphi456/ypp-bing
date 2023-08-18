import { Model } from "./model";
import { View } from "./view";

export class Controller<T> {
  view: View<T>;
  model: Model<T>;
  children: Controller<any>[];

  constructor(model: Model<T>, view: View<T>, children?: Controller<any>[]) {
    this.view = view;
    this.model = model;
    this.children = children ? children : [];
  }

  bindData(data: T) {
    this.model.setData(data);
    return this.updateView();
  }

  updateView() {
    const data = this.model.getData();
    let html = this.view.render(data);
    return html;
  }
}
