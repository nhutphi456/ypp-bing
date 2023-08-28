export class Component<T extends Record<string, any>> {
  private selector: string;
  private template: string;
  private view: string;
  private components: string[] = [];
  private data: T;

  constructor() {}

  getSelector(): string {
    return this.selector;
  }

  getComponents() {
    return this.components;
  }

  setSelector(selector: string) {
    this.selector = selector;
    return this;
  }

  setTemplate(template: string) {
    this.template = template;
    return this;
  }

  setData(data: T) {
    this.data = data;
    return this;
  }

  addChildSelector(component: string) {
    this.components.push(component);
  }

  build() {
    let view = this.template;
    for (let key in this.data) {
      view = view.replace(`{{${key}}}`, this.data[key]);
    }
    this.view = view;
    return this;
  }

  renderView(): string {
    return this.view;
  }
}
