import { Component } from "../base/component";
import { ComponentDecorator } from "../decorator/component";
@ComponentDecorator({
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
