import { News } from "../news/news.model";

export class ListNewsView {
  constructor() {}

  render(listNews: News[]) {
    let listNewsHtml = "<div>";
    listNews.forEach((news) => {
      const newsHtml = `<div class="news"><div>${news.getSource()}</div><div>${news.getTitle()}</div></div>`;
      listNewsHtml += newsHtml;
    });
    listNewsHtml += "</div>";
    return listNewsHtml
  }
}
