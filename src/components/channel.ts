import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "channel",
  template: "<span>{{name}}</span>",
})
export class ChannelComponent {
  name = "VTC";
}
