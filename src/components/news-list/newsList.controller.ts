import { Controller } from "../../classes/controller";
import { INews } from "../news/news.model";
import { NewsListModel } from "./newsList.model";
import { NewsListView } from "./newsList.view";

export class NewsListController extends Controller<INews[]> {
  constructor(
    newsListModel: NewsListModel,
    newsListView: NewsListView,
    children?: Controller<any>[]
  ) {
    super(newsListModel, newsListView, children);
  }

  renderChildren() {
    let childrenHtml = "";
    const childrenData = this.model.getData();
    this.children.forEach((child, index) => {
        childrenHtml += child.bindData(childrenData[index])
    });
    const html = this.updateView().replace("{{children}}", childrenHtml);
    return html;
  }
}
