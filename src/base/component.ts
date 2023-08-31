import { COMPONENT_META_DATA } from "../constant";
import { IComponentMetadata } from "../decorator/component";

export interface Component extends Function {
  new (...args: any[]);
}

export class BaseComponent {
  static getMetadata(): IComponentMetadata | undefined {
    return Reflect.getMetadata(COMPONENT_META_DATA, this);
  }
}
