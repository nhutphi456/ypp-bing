import { Controller } from "../components/classes/controller";
import { Model } from "../components/classes/model";
import { View } from "../components/classes/view";
import { INews } from "../components/model/news";

describe("test item component", () => {
  let news: Model<INews>,
    newsView: View<INews>,
    newsComponent: Controller<INews>;

  beforeAll(() => {
    const template = (data: INews) => `<div>${data.source} ${data.title}</div>`;

    news = new Model();
    newsView = new View(template);
    newsComponent = new Controller(news, newsView);
  });

  it("should bind data into view", () => {
    const html = newsComponent.bindData({
      title: "Chelsea vs Arsenal",
      source: "bbc",
      like: 12,
    });

    expect(html).toBe("<div>bbc Chelsea vs Arsenal</div>");
  });
});

describe("test parent component", () => {
  let listNews: Model<INews[]>,
    listNewsView: View<INews[]>,
    listNewsComponent: Controller<INews[]>;

  beforeAll(() => {
    const template = (data: INews) => `<div>${data.source} ${data.title}</div>`;
    const parentTemplate = (data: INews[]) =>
      `<div><div>List News</div>${data.map((item) => template(item))}</div>`;

    listNews = new Model();
    listNewsView = new View(parentTemplate);
    listNewsComponent = new Controller(listNews, listNewsView);
  });

  it("should bind data into view", () => {
    const listNews = [
      {
        title: "Chelsea vs Arsenal",
        source: "bbc",
        like: 12,
      },
      {
        title: "MU vs MC",
        source: "cnn",
        like: 20,
      },
    ];

    const html = listNewsComponent.bindData(listNews);
    expect(html).toContain("<div>bbc Chelsea vs Arsenal</div>");
    expect(html).toContain("<div>cnn MU vs MC</div>");
  });
});
