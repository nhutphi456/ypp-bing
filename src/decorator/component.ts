import "reflect-metadata";
import { Component } from "../base/component";

export function ComponentDecorator(config: { selector: string; template: string }) {
  return function (target: Function) {
    target.prototype.selector = config.selector;
    target.prototype.template = config.template;
  };
}

export interface IComponentMetadata {
  selector: string;
  template: string;
}

// Define the decorator function
export function ComponentMetadata(metadata: IComponentMetadata) {
  return (target: Component) => {
      Reflect.defineMetadata("componentMetadata", metadata, target);
  };
}
