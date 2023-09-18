import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

const appTemplate = `
  <div>
    Welcome to bing news!
    <finance></finance>
    <news-list></news-list>
    <sport></sport>
    <channel></channel>
  </div>
`;

@ComponentMetadata({
  selector: "app-root",
  template: appTemplate,
})
export class AppComponent extends BaseComponent {}
