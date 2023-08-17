import { ListNewsController } from "../components/list-news/listNews.controller";
import { ListNewsView } from "../components/list-news/listNews.view";
import { NewsController } from "../components/news/news.controller";
import { News } from "../components/news/news.model";
import { NewsView } from "../components/news/news.view";

describe("Test news component", () => {
  let newsView: NewsView, news: News, newsController: NewsController;

  beforeAll(() => {
    news = new News("News 1", "bbc");
    newsView = new NewsView();
    newsController = new NewsController(news, newsView);
  });

  it("should bind data into view", () => {
    const html = newsController.bindData();

    expect(html).toBe(
      `<div class="news"><div>bbc</div><div>News 1</div></div>`
    );
  });
});

describe("Test list news", () => {
  let listNews: News[],
    listNewsView: ListNewsView,
    listNewsController: ListNewsController;

  beforeAll(() => {
    listNews = [new News("News 1", "bbc"), new News("News 2", "bbc")];
    listNewsView = new ListNewsView();
    listNewsController = new ListNewsController(listNews, listNewsView);
  });

  it("should render list news", () => {
    const html = listNewsController.bindData();

    expect(html).toBe(
      `<div><div class="news"><div>bbc</div><div>News 1</div></div><div class="news"><div>bbc</div><div>News 2</div></div></div>`
    );
  });
});
