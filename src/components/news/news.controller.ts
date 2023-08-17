import { News } from "./news.model";
import { NewsView } from "./news.view";

export class NewsController {
  private news: News;
  private newsView: NewsView;

  constructor(news: News, newsView: NewsView) {
    this.news = news;
    this.newsView = newsView;
  }

  bindData() {
    // this.news
    const html = this.newsView.render(this.news);
    return html;
  }

  updateView(){

  }
}
