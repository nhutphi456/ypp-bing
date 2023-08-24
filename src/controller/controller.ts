import { NewsComponent } from "../components/news/news.component";
import { NewsModel } from "../components/news/news.model";
import { NewsView } from "../components/news/news.view";

export class AppController {
    public news: NewsComponent
    constructor() {
        this.news = new NewsComponent(new NewsModel(), new NewsView())
    }
}