export class AppModule {
  public declaration: { [key: string]: Function };
  private rootComponent: Function;

  constructor() {
    this.declaration = {};
  }

  addComponent(component: Function) {
    const appSelector = (component as any).prototype.selector;
    this.declaration[appSelector] = component;
  }

  setRootComponent(component: Function) {
    this.rootComponent = component;
  }

  private render(rootComponentSelector: string) {
    const component = this.declaration[rootComponentSelector];
    const root = new (component as any)();
    document.body.innerHTML = this.interpolate(root);

    this.traverse(document.body);
    return document.body.innerHTML;
  }

  private traverse(element: HTMLElement) {
    const parser = new DOMParser();
    for (let key in this.declaration) {
      const childElements = element.querySelectorAll(key);
      childElements.forEach((element) => {
        const componentClass = this.declaration[element.tagName.toLowerCase()];
        const componentInstance = new (componentClass as any)();
        const newElement = parser.parseFromString(
          this.interpolate(componentInstance),
          "text/html"
        ).body.firstChild as HTMLElement;
        element.parentNode.appendChild(newElement);
        element.parentNode.removeChild(element);
        this.traverse(newElement);
      });
    }
  }

  interpolate(component) {
    let view = component.template;
    for (let key in component) {
      view = view.replace(`{{${key}}}`, component[key]);
    }
    return view;
  }

  run() {
    return this.render(this.rootComponent.prototype.selector);
  }

  
  // render(componentSelector: string): string {
  //   const component = this.components[componentSelector];
  //   let view = component.renderView();
  //   component.getComponents().forEach((childSelector) => {
  //     view = view.replace(`<${childSelector}></${childSelector}>`, this.render(childSelector));
  //   });
  //   return view;
  // }
}
