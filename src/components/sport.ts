import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
    selector: "sport",
    template: "<div>Hello from sport</div>"
})
export class SportComponent extends BaseComponent {
    
}