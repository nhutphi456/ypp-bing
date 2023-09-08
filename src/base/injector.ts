import { COMPONENT_META_DATA } from "../constant";
import { Service } from "../controller/appModule";
import { Component } from "../interfaces/component";

export class Injector extends Map {
  public resolve(target: Service): InstanceType<Service> {
    const providers = Reflect.getMetadata(COMPONENT_META_DATA, target).provider || [];
    const injections = providers.map((token: Service) => this.resolve(token));

    const classInstance = this.get(target);
    if (classInstance) {
      return classInstance;
    }

    const newClassInstance = new target(...injections);
    this.set(target, newClassInstance);

    return newClassInstance;
  }
}

export const bootstrap = (target: Component): InstanceType<Component> => {
  const injector = new Injector();
  const entryClass = injector.resolve(target);

  return entryClass;
};
