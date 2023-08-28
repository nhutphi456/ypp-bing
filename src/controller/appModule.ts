import { Component } from "../base/component";
export class AppModule {
  private components: { [key: string]: Component<any> };
  private rootComponent: Component<any>;

  constructor() {
    this.components = {};
  }

  addComponent(component: Component<any>) {
    const appSelector = component.getSelector();
    this.components[appSelector] = component;
  }

  setRootComponent(component: Component<any>) {
    this.rootComponent = component;
  }

  render(componentSelector: string): string {
    const component = this.components[componentSelector];
    let view = component.renderView();
    component.getComponents().forEach((childSelector) => {
      view = view.replace(`<${childSelector}></${childSelector}>`, this.render(childSelector));
    });
    return view;
  }

  run() {
    return this.render(this.rootComponent.getSelector());
  }
}
