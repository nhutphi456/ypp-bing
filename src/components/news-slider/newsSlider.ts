import { BaseComponent } from "../../base/component";
import { ComponentMetadata } from "../../decorator/component";

@ComponentMetadata({
    selector: "news-slider",
    templateUrl: "/news-slider/newsSlider.html"
})
export class NewsSlider extends BaseComponent {
    
}