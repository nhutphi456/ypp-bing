import { Controller } from "../classes/controller";
import { INews, News } from "./news.model";
import { NewsView } from "./news.view";

export class NewsController extends Controller<INews> {
  constructor(news: News, newsView: NewsView) {
    super(news, newsView);
  }
}
