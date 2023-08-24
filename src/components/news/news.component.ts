import { Component } from "../../base/component.decorator";
import { BaseComponent } from "../../base/component";
import { INews, NewsModel } from "./news.model";
import { NewsView } from "./news.view";

@Component({
  selector: "news",
})
export class NewsComponent extends BaseComponent<INews>{
  newsModel: NewsModel;
  newsView: NewsView;

  constructor(
    newsModel: NewsModel,
    newsView: NewsView
  ) {
    super(newsModel, newsView);
  }

}
