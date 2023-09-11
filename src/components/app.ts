import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

const testApp = `
  <div>
    Welcome to bing news!
    <news-list></news-list>
  </div>
`;

const testRenderComp = `
  <div>
    Welcome to my app!
    <sport></sport>
    <finance></finance>
    <channel></channel>
    <news></news>
    <news-list></news-list>
  </div>
`;
@ComponentMetadata({
  selector: "app-root",
  template: testApp,
})
export class AppComponent extends BaseComponent {}
