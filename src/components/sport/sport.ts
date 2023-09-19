import { BaseComponent } from "../../base/component";
import { ComponentMetadata } from "../../decorator/component";

@ComponentMetadata({
    selector: "sport",
    templateUrl: "/sport/sport.html"
})
export class Sport extends BaseComponent {
    
}