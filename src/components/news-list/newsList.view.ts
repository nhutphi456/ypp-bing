import { View } from "../../base/view";
import { INewsList } from "./newsList.model";

export class NewsListView extends View<INewsList>{
    constructor(){
        super()
    }

    render(data: INewsList): string {
        const { newsList } = data
        return `
            <div>
                ${newsList.map(news => `
                    <news data='${JSON.stringify(news)}'></news>
                `)}
            </div>
        `
    }
}