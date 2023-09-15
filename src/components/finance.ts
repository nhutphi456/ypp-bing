import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
    selector: "finance",
    template: `
        <div>Hello from finance</div>
    `
})
export class FinanceComponent extends BaseComponent {
    title: "hello"

    constructor(){
      super()
    }

    getTitle() {
      return new Promise<string>((resolve) => {
        setTimeout(() => resolve("Test 2"), 1000);
      });
    }
}