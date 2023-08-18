import { Model } from "../../classes/model";
import { INews } from "../news/news.model";

export interface INewsList {
  newsList: INews[];
  pagination?: any;
}
export class NewsListModel extends Model<INewsList> {
  constructor() {
    super();
  }
}
