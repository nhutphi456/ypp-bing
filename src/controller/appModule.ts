import { Component } from "../base/component";
import { ReflectHelper } from "../helper/reflectHelper";
import { Renderer } from "../helper/renderer";
import { Declaration } from "../types/declaration";

export class AppModule {
  private declaration: Declaration;
  private rootComponent: Component;
  private renderer: Renderer;
  private reflectHelper: ReflectHelper;

  constructor() {
    this.declaration = {};
    this.renderer = new Renderer();
    this.reflectHelper = new ReflectHelper();
  }

  getDeclaration(): Declaration{
    return this.declaration
  }

  declareComponents(...components: Component[]): void {
    for (const component of components) {
      const selector = this.reflectHelper.getMetadata(component).selector.toUpperCase();
      this.declaration[selector] = component;
    }
  }

  setRootComponent(component: Component): void {
    this.rootComponent = component;
  }

  run(): string {
    const rootSelector = this.reflectHelper.getMetadata(this.rootComponent).selector;
    return this.renderer.renderRoot(rootSelector, this.declaration);
  }
}
