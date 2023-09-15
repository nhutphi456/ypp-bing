import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
    selector: "item-component",
    template: "<div>item: {{data.firstName}}</div>"
})
export class ItemComponent extends BaseComponent {
    data
}