import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

const appTemplate = `
  <div>
    Welcome to bing news!
    <top-news></top-news>
    <finance></finance>
    <news-list></news-list>
    <channel></channel>
    <sport></sport>
  </div>
`;


@ComponentMetadata({
  selector: "app-root",
  template: appTemplate,
})
export class AppComponent extends BaseComponent {}
