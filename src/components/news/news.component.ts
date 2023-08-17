import { NewsController } from "./news.controller";
import { News } from "./news.model";

export class NewsComponent {
    controller: NewsController

    constructor(controller: NewsController){
        this.controller = controller
    }

    
}