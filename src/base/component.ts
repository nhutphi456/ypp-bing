import { Model } from "./model";
import { View } from "./view";

export class BaseComponent<T> {
  view: View<T>;
  model: Model<T>;

  constructor(model: Model<T>, view: View<T>) {
    this.view = view;
    this.model = model;
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
