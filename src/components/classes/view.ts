export class View<T> {
  private template: (data: T) => string;
  constructor(template: (data: T) => string) {
    this.template = template;
  }

  render(data: T): string {
    return this.template(data)
  }
}
