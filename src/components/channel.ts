import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "channel",
  template: "<div>{{name}}</div>",
})
export class ChannelComponent extends BaseComponent {
  name = "VTC";
}
