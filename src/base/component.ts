import { COMPONENT_META_DATA } from "../constant";
import { AppState } from "../controller/appState";
import { IComponentMetadata } from "../decorator/component";
import { BindAttributeHandler } from "../helper/bindAttributeHandler";
import { InterpolationHandler } from "../helper/interpolationHandler";
import { NgForHandler } from "../helper/ngForHandler";
import { NgIfHandler } from "../helper/ngIfHandler";
import { IViewHandler } from "../interfaces/viewHandler";
import { loadTemplate, templateDictionary } from "../utils/fetchTemplate";

export abstract class BaseComponent {
  private viewHandler: IViewHandler;
  appState = AppState.getInstance();

  constructor() {
    const interpolationHandler = new InterpolationHandler();
    const bindAttributeHandler = new BindAttributeHandler();
    const ngForHandler = new NgForHandler();
    const ngIfHandler = new NgIfHandler();

    interpolationHandler.setNext(ngForHandler).setNext(bindAttributeHandler).setNext(ngIfHandler);
    this.viewHandler = interpolationHandler;
  }

  getMetadata(): IComponentMetadata | undefined {
    return Reflect.getMetadata(COMPONENT_META_DATA, this.constructor);
  }

  async render(): Promise<string> {
    const view = await this.getTemplate()
    return this.viewHandler.handle(this, view);
  }

  private async getTemplate() {
    const url = this.getMetadata().templateUrl;
    const componentName = this.constructor.name;
    let view;

    if (componentName in templateDictionary) {
      view = templateDictionary[componentName];
    } else {
      view = await loadTemplate(url);
      templateDictionary[componentName] = view
    }

    return view
  }
}
