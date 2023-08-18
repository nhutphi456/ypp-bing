import { View } from "../../classes/view";
import { NewsController } from "../news/news.controller";
import { NewsModel } from "../news/news.model";
import { NewsView } from "../news/news.view";
import { INewsList } from "./newsList.model";

export class NewsListView extends View<INewsList> {
  constructor() {
    super();
  }

  render(data: INewsList): string {
    const { newsList, pagination } = data;
    return `
          <div>
            <span>News List</span>
            <div>
              ${newsList.map((newsData) => {
                const newComponent = new NewsController(
                  newsData,
                  new NewsModel(),
                  new NewsView()
                );
                return newComponent.render();
              })}
            </div>
          </div>
        `;
  }
}
