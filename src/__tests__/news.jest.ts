import { NewsListController } from "../components/news-list/newsList.controller";
import { NewsListModel } from "../components/news-list/newsList.model";
import { NewsListView } from "../components/news-list/newsList.view";
import { NewsController } from "../components/news/news.controller";
import { INews, NewsModel } from "../components/news/news.model";
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

describe("Test list news component", () => {
  let news1,
    news2: NewsModel,
    newsView1,
    newsView2: NewsView,
    newsController1,
    newsController2: NewsController,
    newsList: NewsListModel,
    newsListView: NewsListView,
    newsListController: NewsListController;

  beforeAll(() => {
    news1 = new NewsModel();
    newsView1 = new NewsView();
    newsController1 = new NewsController(news1, newsView1);

    news2 = new NewsModel();
    newsView2 = new NewsView();
    newsController2 = new NewsController(news2, newsView2);

    newsList = new NewsListModel();
    newsListView = new NewsListView();
    newsListController = new NewsListController(newsList, newsListView, [
      newsController1,
      newsController2,
    ]);

    const childrenData: INews[] = [
      {
        title: "Chelsea vs Arsenal",
        source: "BBC",
        like: 12
      },
      {
        title: "MU vs MC",
        source: "CNN",
        like: 20
      }
    ]
    newsListController.bindData(childrenData)
  });

  it("should render news children inside list news", () => {
    const html = newsListController.renderChildren();

    expect(html).toContain("<div>BBC Chelsea vs Arsenal</div>")
    expect(html).toContain("<div>CNN MU vs MC</div>")
    expect(html).toContain("<div><span>List News</span><div><div>BBC Chelsea vs Arsenal</div><div>CNN MU vs MC</div></div></div>")
  });
});
