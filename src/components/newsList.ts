import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";
import { NewsService } from "../services/newsService";

@ComponentMetadata({
    selector: "news-list",
    template: `
        <div class="flex flex-wrap p-6">
            <news *ngFor="let item of newsList.articles" data="item"></news>
        </div>
    `
})
export class NewsList extends BaseComponent {
    newsList = this.appState.addState(this.getNewsList(), "newsList") || []
    constructor(private newsService: NewsService) {
        super()
    }

    getNewsList() {
        return this.newsService.getTopNews()
    }
}