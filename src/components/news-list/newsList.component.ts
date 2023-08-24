import { BaseComponent } from "../../base/component";
import { INewsList, NewsListModel } from "./newsList.model";
import { NewsListView } from "./newsList.view";

export class NewsListComponent extends BaseComponent<INewsList> {
  static selector = "news-list";

  constructor() {
    const newsListModel = new NewsListModel();
    const newsListView = new NewsListView();
    super(newsListModel, newsListView);
  }
}
