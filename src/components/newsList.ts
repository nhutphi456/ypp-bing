import { ComponentDecorator } from "../decorator/component";
import { News } from "../models/news";

@ComponentDecorator({
  selector: "news-list",
  template: `
        <div>
            <span>News List</span>
            <news *ngFor="let item of items" data={{item}}></news>
        </div>
    `,
})
export class NewsList {
  newsList: News[] = [
    {
      title: "News 1",
      like: 20,
    },
    {
      title: "News 2",
      like: 10,
    },
  ];
}
