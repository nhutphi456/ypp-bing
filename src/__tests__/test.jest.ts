import { AppController } from "../controller/controller";

describe("Test News", () => {
  it("should render news component", () => {
    const app = new AppController();
    app.news.bindData({
      title: "MU vs MC",
      source: "BBC",
      like: 12,
    });

    const result = app.news.render();

    expect(result).toBe(`<div>BBC MU vs MC</div>`);
  });
});