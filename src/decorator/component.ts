import "reflect-metadata";
import { Component } from "../interfaces/component";

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
