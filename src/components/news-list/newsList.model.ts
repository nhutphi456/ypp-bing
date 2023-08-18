import { Model } from "../../classes/model";
import { INews } from "../news/news.model";

export class NewsListModel extends Model<INews[]> {
    constructor() {
        super()
    }
}