import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "finance",
  template: `
        <channel></channel>
        <div>Hello from {{title}}</div>
    `,
})
export class FinanceComponent extends BaseComponent {
  title = this.appState.addState(this.getTitle(), 'title') || "finance";

  constructor() {
    super();
  }

  getTitle() {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve("finance 2"), 1000);
    });
  }
}
