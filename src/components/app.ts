import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "app-root",
  template: `
    <div>
      Welcome to my app!
      <sport></sport>
      <finance></finance>
      <channel></channel>
      <news></news>
      <news-list></news-list>
    </div>
  `,
})
export class AppComponent extends BaseComponent {}
