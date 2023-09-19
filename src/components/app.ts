import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

// const appTemplate = `
//   <div>
//     <news-list></news-list>
//   </div>
// `;

@ComponentMetadata({
  selector: "app-root",
  // template: appTemplate,
  templateUrl: "/app.html"
})
export class AppComponent extends BaseComponent {}
