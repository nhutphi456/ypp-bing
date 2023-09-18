import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

const appTemplate = `
  <div>
    Welcome to bing news!
    <div class="flex">
    <news-slider></news-slider>
    </div>
  </div>
`;

@ComponentMetadata({
  selector: "app-root",
  template: appTemplate,
})
export class AppComponent extends BaseComponent {}
