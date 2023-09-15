import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";
// import { News } from "../models/news";
import { NewsService } from "../services/newsService";

import { lastValueFrom } from "rxjs";

@ComponentMetadata({
  selector: "news-list",
  template: `
    <div id="newsList">
      <span>News List</span>
      <div class="flex space-x-4">
        <ads *ngFor="let item of newsList" data="item"></ads>
      </div>
    </div>
  `,
})
export class NewsList extends BaseComponent {
  newsList = this.appState.addState(this.fetchNews(), "newsList") || []

  constructor(private newsService: NewsService) {
    super();
  }

  async fetchNews(): Promise<void> {
    const newsObs = this.newsService.getNews();
    return lastValueFrom(newsObs);
  }
}

/**
 * newsList = createResource(action, "newsList")
 *
 */
