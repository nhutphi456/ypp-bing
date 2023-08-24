import { View } from "../../base/view";
import { INews } from "./news.model";
export class NewsView extends View<INews> {  
  constructor() {
    super();
  }
  
  render(data: INews): string {
    return `<div>${data.source} ${data.title}</div>`
  }
}

