import { BaseComponent } from "../../base/component";
import { ComponentMetadata } from "../../decorator/component";

@ComponentMetadata({
    selector: "news",
    template: `
      <div *ngIf="data.urlToImage" class="rounded overflow-hidden shadow-lg w-full min-h-350" style="min-height: 350px;">
      <div class="w-full h-1/2" style="background: url({{data.urlToImage}}) no-repeat center center; background-size: cover;"></div>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{data.title}}</div>
      </div>
      <div class="px-6 pt-4 pb-2">
        
      </div>
    </div>
    `,
    templateUrl: "/news/news.html"
})
export class News extends BaseComponent {
    data
}