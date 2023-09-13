import { COMPONENT_META_DATA } from "../constant";
import { ReflectHelper } from "../helper/reflectHelper";
import { Renderer } from "../helper/renderer";
import { Component } from "../interfaces/component";
import { Service } from "../interfaces/service";
import { Declaration } from "../types/declaration";

export class AppModule {
  static declaration: Declaration = {};
  static rootComponent: Component;
  static renderer: Renderer = new Renderer();
  static reflectHelper: ReflectHelper = new ReflectHelper();
  static providers: Service[] = [];

  static getDeclaration(): Declaration {
    return AppModule.declaration;
  }

  static declareServices(...services: Service[]): void {
    AppModule.providers = [...new Set([...AppModule.providers, ...services])];

    for (const key in AppModule.declaration) {
      const target = AppModule.reflectHelper.getComponentMetadata(AppModule.declaration[key]);
      let serviceList = target.provider || [];
      serviceList = [...new Set([...serviceList, ...AppModule.providers])];
      Reflect.defineMetadata(
        COMPONENT_META_DATA,
        {
          ...target,
          provider: serviceList,
        },
        AppModule.declaration[key]
      );
    }
  }

  static declareComponents(...components: Component[]): void {
    components.forEach((component) => {
      const selector = AppModule.reflectHelper.getComponentMetadata(component).selector.toUpperCase();
      AppModule.declaration[selector] = component;
    });
  }

  static setRootComponent(component: Component): void {
    AppModule.rootComponent = component;
  }

  static run(): string {
    const rootSelector = AppModule.reflectHelper.getComponentMetadata(AppModule.rootComponent).selector;
    return AppModule.renderer.renderRoot(rootSelector, AppModule.declaration);
  }
}
