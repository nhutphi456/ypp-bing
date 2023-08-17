import { NewsController } from "../components/news/news.controller";
import { NewsModel } from "../components/news/news.model";
import { NewsView } from "../components/news/news.view";

describe("Test news component", () => {
  let newsModel: NewsModel, newsView: NewsView, newsController: NewsController;

  beforeAll(() => {
    newsModel = new NewsModel();
    newsView = new NewsView();
    newsController = new NewsController(newsModel, newsView);
  });

  it("should bind data into news view", () => {
    const html = newsController.bindData({
      title: "MU vs MC",
      source: "cnn",
      like: 20,
    });
    expect(html).toBe("<div>cnn MU vs MC</div>");
  });
});
