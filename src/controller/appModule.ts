import { Component } from "../base/component";
import { Renderer } from "./renderer";

export class AppModule {
  public declaration: { [key: string]: Component };
  private rootComponent: Component;
  private renderer: Renderer;

  constructor() {
    this.declaration = {};
    this.renderer = new Renderer();
  }

  declareComponent(...components: Component[]) {
    for (const component of components) {
      const appSelector = component.prototype.selector;
      this.declaration[appSelector] = component;
    }
  }

  setRootComponent(component: Component) {
    this.rootComponent = component;
  }

  run() {
    return this.renderer.renderRoot(
      this.rootComponent.prototype.selector,
      this.declaration
    );
  }
}
