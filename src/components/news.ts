import { ComponentMetadata } from "../decorator/component";
@ComponentMetadata({
  selector: "news",
  template: `
    <div>
      <p>title: {{title}}</p>
      <channel></channel>
    </div>
  `,
})
export class NewsComponent {
  title = "News 1";
  constructor() {}
}
