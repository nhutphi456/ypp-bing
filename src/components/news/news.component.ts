import { BaseComponent } from "../../base/component";
import { INews, NewsModel } from "./news.model";
import { NewsView } from "./news.view";

export class NewsComponent extends BaseComponent<INews> {
  static selector = "news";

  constructor() {
    const newsModel = new NewsModel();
    const newsView = new NewsView();
    super(newsModel, newsView);
  }
}
