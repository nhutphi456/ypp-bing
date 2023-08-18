import { NewsListController } from "../components/news-list/newsList.controller";
import { NewsListModel } from "../components/news-list/newsList.model";
import { NewsListView } from "../components/news-list/newsList.view";
import { NewsController } from "../components/news/news.controller";
import { NewsModel } from "../components/news/news.model";
import { NewsView } from "../components/news/news.view";


describe("Test news component", () => {
  let newsComponent: NewsController;

  beforeAll(() => {
    const data = {
      title: "MU vs MC",
      source: "cnn",
      like: 20,
    };
    newsComponent = new NewsController(data, new NewsModel(), new NewsView());
  });

  it("should bind data into news view", () => {
    expect(newsComponent.render()).toBe("<div>cnn MU vs MC</div>");
  });
});

describe("Test list news component", () => {
  let newsListComponent: NewsListController;

  beforeAll(() => {
    const data = {
      newsList: [
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
      ],
    };

    newsListComponent = new NewsListController(data, new NewsListModel(), new NewsListView())
  });

  it("should render news component inside newsList component", () => {
    expect(newsListComponent.render()).toContain("<div>BBC Chelsea vs Arsenal</div>")
    expect(newsListComponent.render()).toContain("<div>CNN MU vs MC</div>")
  })
});