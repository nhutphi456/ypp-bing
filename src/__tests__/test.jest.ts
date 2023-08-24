import { AppComponent } from "../app/app.component"
import { NewsComponent } from "../components/news/news.component"
import { NewsModel } from "../components/news/news.model"
import { NewsView } from "../components/news/news.view"
import { AppController } from "../controller/controller"

describe("Test News", () => {
  it("should render news component", () => {
    const app = new AppController()
    app.news.bindData({
      title: "MU vs MC",
      source: "BBC",
      like: 12
    })

    const result = app.news.render()

    expect(result).toBe(`<div>BBC MU vs MC</div>`)
  })
})