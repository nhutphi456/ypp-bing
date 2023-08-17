import { Controller } from "../../classes/controller";
import { INews, NewsModel } from "./news.model";
import { NewsView } from "./news.view";

export class NewsController extends Controller<INews> {
  constructor(newsModel: NewsModel, newsView: NewsView) {
    super(newsModel, newsView);
  }
}
