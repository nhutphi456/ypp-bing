import { View } from "../../classes/view";
import { INews } from "./news.model";

export class NewsView extends View<INews> {
    constructor() {
      super((data: INews) => `<div>${data.source} ${data.title}</div>`);
    }
  }