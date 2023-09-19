import { BaseComponent } from "../../base/component";
import { ComponentMetadata } from "../../decorator/component";
import { NewsService } from "../../services/newsService";

@ComponentMetadata({
  selector: "news-list",
  templateUrl: "/news/newsList.html"
})
export class NewsList extends BaseComponent {
  newsList = this.appState.addState(this.getNewsList(), "newsList") || [];
    // newsList = newsData;
  constructor(private newsService: NewsService) {
    super();
  }

  getNewsList() {
    return this.newsService.getTopNews();
  }
}

