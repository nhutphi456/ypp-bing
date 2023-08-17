import { Component } from "../classes/component";
import { NewsController } from "./news.controller";
import { INews } from "./news.model";

export class NewsComponent  extends Component<INews> {
  constructor(controller: NewsController){
    super(controller)
  }
}
