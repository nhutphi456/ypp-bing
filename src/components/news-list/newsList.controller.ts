import { Controller } from "../../classes/controller";
import { INews } from "../news/news.model";
import { INewsList, NewsListModel } from "./newsList.model";
import { NewsListView } from "./newsList.view";

export class NewsListController extends Controller<INewsList> {
  newsListModel: NewsListModel
  newListView: NewsListView
  constructor(
    data: INewsList,
    newsListModel: NewsListModel,
    newListView: NewsListView
  ) {
    super(data, newsListModel, newListView);
    
  }
}
