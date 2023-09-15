import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "finance",
  template: `
        <div>Hello from {{title}}</div>
        <channel></channel>
    `,
})
export class FinanceComponent extends BaseComponent {
  title = this.appState.addState(this.getTitle(), 'title') || "finance";

  constructor() {
    super();
  }

  getTitle() {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve("Test 2"), 1000);
    });
  }
}
