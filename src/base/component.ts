export class ComponentBuilder<T extends Record<string, any>> {
  private selector: string;
  private template: string;
  private data: T;

  constructor() {}

  setSelector(selector: string) {
    this.selector = selector
  }

  setTemplate(template: string) {
    this.template = template;
  }

  setData(data: T) {
    this.data = data;
  }

  build(): string {
    let view = this.template;
    for (let key in this.data) {
      view = view.replace(`{{${key}}}`, this.data[key]);
    }
    return view;
  }
}
