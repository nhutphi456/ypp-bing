import { ComponentDecorator } from "../decorator/component";

@ComponentDecorator({
  selector: "channel",
  template: "<span>{{name}}</span>",
})
export class ChannelComponent {
  name = "VTC";
}
