import { Model } from "./model";
import { View } from "./view";

export class Controller<T> {
  data: T
  view: View<T>;
  model: Model<T>;

  constructor(data: T, model: Model<T>, view: View<T>) {
    this.view = view;
    this.model = model;
    this.data = data
    this.bindData(this.data)
  }

  bindData(data: T) {
    this.model.setData(data);
    this.render();
  }

  render() {
    const data = this.model.getData();
    let html = this.view.render(data);
    return html;
  }
}
