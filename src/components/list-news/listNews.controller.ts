import { News } from "../news/news.model";
import { ListNewsView } from "./listNews.view";

export class ListNewsController {
  listNews: News[];
  listNewsView: ListNewsView;

  constructor(listNews: News[], listNewsView: ListNewsView) {
    this.listNews = listNews;
    this.listNewsView = listNewsView;
  }

  bindData() {
    const html = this.listNewsView.render(this.listNews);
    return html;
  }
}
