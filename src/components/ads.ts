import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "ads",
  template: `
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <channel></channel>
        <img class="w-full" src={{data.image}} alt="Sunset in the mountains">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{data.title}}</div>
            <p class="text-gray-700 text-base">
                {{data.description}}
            </p>
        </div>
    </div>
  `,
})
export class AdsComponent extends BaseComponent {
  data;
}
