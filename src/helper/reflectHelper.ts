import { Component } from "../base/component";
import { COMPONENT_META_DATA } from "../constant";

export class ReflectHelper {
    constructor(){}

    getComponentMetadata(component: Component) {
        return Reflect.getMetadata(COMPONENT_META_DATA, component) 
    }
}