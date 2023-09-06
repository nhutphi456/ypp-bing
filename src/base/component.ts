import { COMPONENT_META_DATA } from "../constant";
import { IComponentMetadata } from "../decorator/component";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface Component extends Function {
  new (...args: any[]);
}


export class BaseComponent {
  constructor(){}
  
  getMetadata(): IComponentMetadata | undefined {
    return Reflect.getMetadata(COMPONENT_META_DATA, this.constructor);
  }
}

