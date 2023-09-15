import { COMPONENT_META_DATA } from "../constant";
import { AppState } from "../controller/appState";
import { IComponentMetadata } from "../decorator/component";
import { BindAttributeHandler } from "../helper/bindAttributeHandler";
import { InterpolationHandler } from "../helper/interpolationHandler";
import { NgForHandler } from "../helper/ngForHandler";
import { NgIfHandler } from "../helper/ngIfHandler";
import { IViewHandler } from "../interfaces/viewHandler";
import { v4 as uuidv4 } from "uuid";

export abstract class BaseComponent {
  id = uuidv4()
  private viewHandler: IViewHandler;
  appState = AppState.getInstance()

  constructor() {
    const interpolationHandler = new InterpolationHandler();
    const bindAttributeHandler = new BindAttributeHandler();
    const ngForHandler = new NgForHandler();
    const ngIfHandler = new NgIfHandler();

    interpolationHandler.setNext(ngForHandler).setNext(bindAttributeHandler).setNext(ngIfHandler)
    this.viewHandler = interpolationHandler;

  }

  getMetadata(): IComponentMetadata | undefined {
    return Reflect.getMetadata(COMPONENT_META_DATA, this.constructor);
  }

  render(): string {
    const view = this.getMetadata().template;
    return this.viewHandler.handle(this, view);
  }
}
