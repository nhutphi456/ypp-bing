import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";
import { NewsService } from "../services/newsService";

const sliderTemplate = `
<div class="max-w-2xl m-auto">
<div id="default-carousel" class="relative mb-4 mt-4 ml-4" data-carousel="static">
  <!-- Carousel wrapper -->
  <div class="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
      <news-slider-item *ngFor="let item of newsList.articles" data="item"></news-slider-item>
  </div>
  <!-- Slider indicators -->
  <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
  </div>
  <!-- Slider controls -->
  <button type="button" class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
      <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <span class="hidden">Previous</span>
      </span>
  </button>
  <button type="button" class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
      <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          <span class="hidden">Next</span>
      </span>
  </button>
</div>
<p class="ml-4">This carousel component is part of the <a class="text-blue-600 hover:underline" href="https://flowbite.com/docs/components/carousel/" target="_blank">Flowbite component library.</a></p>
</div>
`;
@ComponentMetadata({
  selector: "news-slider",
  template: `
  <news-slider-item *ngFor="let item of newsList.articles" data="item"></news-slider-item>
  `,
})
export class NewsSlider extends BaseComponent {
  //   newsList = this.appState.addState(this.fetchNewsList(), "newsList") || [];
  newsList = newsListSlider;
  constructor(private newsService: NewsService) {
    super();
  }

  async fetchNewsList() {
    return this.newsService.getSliderNews();
  }
}

const newsListSlider = {
  articles: [
    {
      source: {
        id: null,
        name: "YouTube",
      },
      author: null,
      title: "LASD deputy shot in patrol car - FOX 11 Los Angeles",
      description:
        "A Los Angeles County Sheriff's deputy was shot while on duty in their patrol car outside the Palmdale Sheriff's Station. The deputy was taken to the hospital...",
      url: "https://www.youtube.com/watch?v=KB4ReVnCIpE",
      urlToImage: "https://i.ytimg.com/vi/KB4ReVnCIpE/hqdefault.jpg",
      publishedAt: "2023-09-17T05:12:27Z",
      content: null,
    },
    {
      source: {
        id: null,
        name: "CBS Sports",
      },
      author: "",
      title:
        "WATCH: Colorado State players mock Deion Sanders with touchdown celebrations in chippy rivalry with Colorado - CBS Sports",
      description:
        "Colorado State players kept fanning the rivalry's flames while taking on Sanders and the Buffaloes",
      url: "https://www.cbssports.com/college-football/news/watch-colorado-state-players-mock-deion-sanders-with-touchdown-celebrations-in-chippy-rivalry-with-colorado/",
      urlToImage:
        "https://sportshub.cbsistatic.com/i/r/2023/09/17/60634d75-989e-4333-a589-0e6c95d5b711/thumbnail/1200x675/21f5a3de3ce94b2e661bc4dac1284691/cu-csu-final.jpg",
      publishedAt: "2023-09-17T04:50:00Z",
      content:
        "Colorado State continued to fan the flames of its rivalry with Colorado in a 43-35 loss to the Buffaloes Saturday night. The Rams punctuated two of their early touchdowns by mocking iconic celebratio… [+1513 chars]",
    },
    {
      source: {
        id: null,
        name: "MacRumors",
      },
      author: "Joe Rossignol",
      title:
        "iPhone 15's USB-C Port: 4.5W Charging for Accessories, USB 3.2 Gen 2 for Pro Models, and More - MacRumors",
      description:
        "In a support document published on Friday, Apple provided some additional details about the USB-C port found on all iPhone 15 models.   First, Apple...",
      url: "https://www.macrumors.com/2023/09/16/iphone-15-usb-c-port-details/",
      urlToImage:
        "https://images.macrumors.com/t/8NEqpnIEJGyQjMAfjL0bf6fpSjA=/1600x/article-new/2023/09/iPhone-15-USB-C-Port-Event-Still.jpg",
      publishedAt: "2023-09-17T03:17:11Z",
      content:
        "In a support document published on Friday, Apple provided some additional details about the USB-C port found on all iPhone 15 models.\r\nFirst, Apple said all iPhone 15 models can charge an Apple Watch… [+1181 chars]",
    },
  ],
};
