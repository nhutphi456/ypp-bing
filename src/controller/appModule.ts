import { ReflectHelper } from "../helper/reflectHelper";
import { Renderer } from "../helper/renderer";
import { Component } from "../interfaces/component";
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

  getDeclaration(): Declaration {
    return this.declaration;
  }

  declareComponents(...components: Component[]): void {
    components.forEach((component) => {
      const selector = this.reflectHelper.getComponentMetadata(component).selector.toUpperCase();
      this.declaration[selector] = component;
    });
  }

  setRootComponent(component: Component): void {
    this.rootComponent = component;
  }

  run(): string {
    const rootSelector = this.reflectHelper.getComponentMetadata(this.rootComponent).selector;
    return this.renderer.renderRoot(rootSelector, this.declaration);
  }
}
