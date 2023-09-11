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
}