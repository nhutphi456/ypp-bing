import { Component } from "../base/component";
import { COMPONENT_META_DATA } from "../constant";
import { ReflectHelper } from "../helper/reflectHelper";
import { Renderer } from "../helper/renderer";

export class AppModule {
  public declaration: { [key: string]: Component };
  private rootComponent: Component;
  private renderer: Renderer;
  private reflectHelper: ReflectHelper;

  constructor() {
    this.declaration = {};
    this.renderer = new Renderer();
    this.reflectHelper = new ReflectHelper();
  }

  declareComponents(...components: Component[]) {
    for (const component of components) {
      const selector = this.reflectHelper.getMetadata(component).selector;
      this.declaration[selector] = component;
    }
  }

  setRootComponent(component: Component) {
    this.rootComponent = component;
  }

  run() {
    const rootSelector = this.reflectHelper.getMetadata(
      this.rootComponent
    ).selector;
    return this.renderer.renderRoot(rootSelector, this.declaration);
  }
}
