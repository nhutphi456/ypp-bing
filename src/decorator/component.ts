import "reflect-metadata";
import { Component } from "../interfaces/component";
import { Service } from "../controller/appModule";

export interface IComponentMetadata {
  selector: string;
  template: string;
  provider?: Service[]
}

// Define the decorator function
export function ComponentMetadata(metadata: IComponentMetadata) {
  return (target: Component) => {
    Reflect.defineMetadata("componentMetadata", metadata, target);
  };
}
