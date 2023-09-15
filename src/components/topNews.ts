import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "top-news",
  template: `
        <div>hello from top news</div>
        <item-component data="topNews.name"></item-component>
    `,
})
export class TopNews extends BaseComponent {
  topNews = {
    name: {
        firstName: "jason"
    },
  };
}
