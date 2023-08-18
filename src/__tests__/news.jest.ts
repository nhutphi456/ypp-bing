import { NewsListController } from "../components/news-list/newsList.controller";
import { NewsListModel } from "../components/news-list/newsList.model";
import { NewsListView } from "../components/news-list/newsList.view";
import { NewsController } from "../components/news/news.controller";
import { INews, NewsModel } from "../components/news/news.model";
import { NewsView } from "../components/news/news.view";

describe("Test news component", () => {
  let newsController: NewsController;

  beforeAll(() => {
    newsController = new NewsController(new NewsModel(), new NewsView());
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

describe("Test list news component", () => {
  let newsController1,
    newsController2: NewsController,
    newsListController: NewsListController;

  beforeAll(() => {
    newsController1 = new NewsController(new NewsModel(), new NewsView());
    newsController2 = new NewsController(new NewsModel(), new NewsView());
    newsListController = new NewsListController(
      new NewsListModel(),
      new NewsListView(),
      [newsController1, newsController2]
    );

    const childrenData: INews[] = [
      {
        title: "Chelsea vs Arsenal",
        source: "BBC",
        like: 12,
      },
      {
        title: "MU vs MC",
        source: "CNN",
        like: 20,
      },
    ];
    newsListController.bindData(childrenData);
  });

  it("should render news children inside list news", () => {
    const html = newsListController.renderChildren();

    expect(html).toContain("<div>BBC Chelsea vs Arsenal</div>");
    expect(html).toContain("<div>CNN MU vs MC</div>");
    expect(html).toBe(
      "<div><span>List News</span><div><div>BBC Chelsea vs Arsenal</div><div>CNN MU vs MC</div></div></div>"
    );
  });
});
