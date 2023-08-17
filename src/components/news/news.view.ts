import { News } from "./news.model";

export class NewsView {
  constructor() {}
  render(news: News): string {
    return `<div class="news"><div>${news.source}</div><div>${news.title}</div></div>`;
  }
}
