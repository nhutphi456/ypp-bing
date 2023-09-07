import { COMPONENT_META_DATA } from "../constant";
import { IComponentMetadata } from "../decorator/component";
import { BindAttributeHandler } from "../helper/bindAttributeHandler";
import { InterpolationHandler } from "../helper/interpolationHandler";
import { NgForHandler } from "../helper/ngForHandler";
import { IViewHandler } from "../interfaces/viewHandler";

export abstract class BaseComponent {
  private viewHandler: IViewHandler

  constructor() {
    const interpolationHandler = new InterpolationHandler()
    const bindAttributeHandler = new BindAttributeHandler()
    const ngForHandler = new NgForHandler()

    interpolationHandler.setNext(ngForHandler).setNext(bindAttributeHandler)
    
    this.viewHandler = interpolationHandler
  }

  getMetadata(): IComponentMetadata | undefined {
    return Reflect.getMetadata(COMPONENT_META_DATA, this.constructor);
  }

  render(): string {
    const view = this.getMetadata().template;
    return this.viewHandler.handle(this, view)
  }
}
