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
  newsList = [
    
  ];

  constructor(private newsService: NewsService) {
    super(); 
    this.fetchNews()
  }

  async fetchNews(): Promise<void> {
    const newsObs = this.newsService.getNews();
    this.newsList = await lastValueFrom(newsObs);
    this.appState.update(this)
  }
}
