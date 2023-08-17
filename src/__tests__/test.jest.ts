import { NewsComponent } from "../components/news/news.component";
import { NewsController } from "../components/news/news.controller";
import { News } from "../components/news/news.model";
import { NewsView } from "../components/news/news.view";


describe("test item component", () => {
  let news: News, newsView: NewsView, newsController: NewsController, newsComponent: NewsComponent

  beforeAll(() => {
    news = new News();
    newsView = new NewsView();
    newsController = new NewsController(news, newsView);
    newsComponent = new NewsComponent(newsController)
  });

  it("should bind data into view", () => {
    newsComponent.updateData({
      title: "Chelsea vs Arsenal",
      source: "bbc",
      like: 12,
    });

    const html = newsController.updateView()

    expect(html).toBe("<di>bbc Chelsea vs Arsenal</di>")
  });
});
