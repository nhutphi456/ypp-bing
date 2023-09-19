import { BaseComponent } from "../../base/component";
import { ComponentMetadata } from "../../decorator/component";
import { NewsService } from "../../services/newsService";

@ComponentMetadata({
  selector: "news-list",
  template: `
        <div class="grid grid-cols-4 gap-4 p-6">
            <news *ngFor="let item of newsList.articles" data="item"></news>
        </div>
    `,
})
export class NewsList extends BaseComponent {
  // newsList = this.appState.addState(this.getNewsList(), "newsList") || [];
    newsList = [];
  constructor(private newsService: NewsService) {
    super();
  }

  getNewsList() {
    return this.newsService.getTopNews();
  }
}
