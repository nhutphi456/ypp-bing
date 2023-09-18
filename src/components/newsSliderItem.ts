import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "news-slider-item",
  template: `
    <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <span class="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
          <img src={{data.urlToImage}} class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="...">
      </div>
    `,
})
export class NewsSliderItem extends BaseComponent {
    data
}
