export class NewsService {
  constructor() {}

  async getNews() {
    const res = await fetch("./services/news.json");
    const news = await res.json();
    return news;
  }
}
