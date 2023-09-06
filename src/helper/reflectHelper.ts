import { COMPONENT_META_DATA } from "../constant";
import { Component } from "../interfaces/component";

export class ReflectHelper {
    constructor(){}

    getComponentMetadata(component: Component) {
        return Reflect.getMetadata(COMPONENT_META_DATA, component) 
    }
}