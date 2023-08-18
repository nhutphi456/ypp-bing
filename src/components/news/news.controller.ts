import { Controller } from "../../classes/controller";
import { INews, NewsModel } from "./news.model";
import { NewsView } from "./news.view";

export class NewsController extends Controller<INews> {
  data: INews;
  newsModel: NewsModel;
  newsView: NewsView;
  constructor(data: INews, newsModel: NewsModel, newsView: NewsView) {
    super(data, newsModel, newsView);
  }
}
