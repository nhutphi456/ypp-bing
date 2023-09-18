import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "finance",
  template: `
        <h2 class="text-2xl">Hello from <span class="font-bold">{{title}}</span></h2>
        <div>test2</div>
        `,
})
export class FinanceComponent extends BaseComponent {
  title = this.appState.addState(this.getTitle(), 'title') || "finance"

  constructor() {
    super();
  }

  getTitle() {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve("finance 2"), 1000);
    });
  }
}
