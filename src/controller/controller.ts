import { NewsListComponent } from "../components/news-list/newsList.component";
import { NewsComponent } from "../components/news/news.component";

export class AppController {
  public news: NewsComponent;
  public newsList: NewsListComponent;
  public declarations = [NewsComponent, NewsListComponent];

  constructor() {
    this.news = new NewsComponent();
    this.newsList = new NewsListComponent();
  }
}
