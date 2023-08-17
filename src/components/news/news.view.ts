import { View } from "../classes/view";
import {  INews } from "./news.model";

export class NewsView extends View<INews> {
    constructor(){
        super()
    }

    render(data: INews){
        return `<di>${data.source} ${data.title}</di>`
    }
}