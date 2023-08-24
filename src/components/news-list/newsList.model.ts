import { Model } from "../../base/model";
import { INews } from "../news/news.model";

export interface INewsList {
  newsList: INews[];
}
export class NewsListModel extends Model<INewsList> {
  constructor() {
    super();
  }
}
