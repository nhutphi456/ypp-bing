import { COMPONENT_META_DATA } from "../constant";
import { IComponentMetadata } from "../decorator/component";
import { BindAttributeHandler } from "../helper/bindAttributeHandler";
import { InterpolationHandler } from "../helper/interpolationHandler";
import { IViewHandler } from "../interfaces/viewHandler";

export class BaseComponent {
  private viewHandler: IViewHandler

  constructor() {
    const interpolationHandler = new InterpolationHandler()
    const bindAttributeHandler = new BindAttributeHandler()

    interpolationHandler.setNext(bindAttributeHandler)
    
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
