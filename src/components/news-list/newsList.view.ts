import { View } from "../../classes/view";
import { INews } from "../news/news.model";

export class NewsListView extends View<INews[]> {
  constructor() {
    super(
      () => `<div><span>List News</span><div>{{children}}</div></div>`
    );
  }
}
