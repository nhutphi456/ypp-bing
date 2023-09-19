import { BaseComponent } from "../../base/component";
import { ComponentMetadata } from "../../decorator/component";
import { NewsService } from "../../services/newsService";

@ComponentMetadata({
  selector: "news-list",
  templateUrl: "/news/newsList.html"
})
export class NewsList extends BaseComponent {
  newsList = this.appState.addState(this.getNewsList(), "newsList") || [];
    // newsList = newsData;
  constructor(private newsService: NewsService) {
    super();
  }

  getNewsList() {
    return this.newsService.getTopNews();
  }
}

const newsData = {
  articles: [
    {
      "source": {
          "id": "reuters",
          "name": "Reuters"
      },
      "author": "Reuters",
      "title": "Rifle, fur hat, drones: North Korea's Kim returns with gifts from Russia - Reuters",
      "description": "North Korean leader Kim Jong Un is heading home on Monday, most likely with gifts from his <a href=\"/world/north-koreas-kim-heads-home-after-final-stop-russias-vladivostok-kcna-2023-09-17/\">Russian</a> hosts including a rifle, a cosmonaut's glove, and militar…",
      "url": "https://www.reuters.com/world/rifle-fur-hat-drones-north-koreas-kim-returns-with-gifts-russia-2023-09-18/",
      "urlToImage": "https://www.reuters.com/resizer/JZQpF1pBdCwhRrmPB12N7OP9YjI=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/PLOLRQURB5MI3P5QO7NMNTKNT4.jpg",
      "publishedAt": "2023-09-18T06:41:26Z",
      "content": "SEOUL, Sept 18 (Reuters) - North Korean leader Kim Jong Un is heading home on Monday, most likely with gifts from his Russian hosts including a rifle, a cosmonaut's glove, and military drones - which… [+3496 chars]"
  },
  {
      "source": {
          "id": null,
          "name": "CNBC"
      },
      "author": "Reuters",
      "title": "Naspers, Prosus CEO Bob van Dijk steps down - CNBC",
      "description": "Ervin Tu will assume the role of interim chief executive of both companies.",
      "url": "https://www.cnbc.com/2023/09/18/naspers-prosus-ceo-bob-van-dijk-steps-down.html",
      "urlToImage": "https://image.cnbcfm.com/api/v1/image/106123387-1568185989975gettyimages-1166232188.jpeg?v=1695016566&w=1920&h=1080",
      "publishedAt": "2023-09-18T05:56:06Z",
      "content": "Dutch-listed technology investor Prosus NV and its South African parent Naspers said on Monday Bob van Dijk has stepped down as chief executive officer from both companies.\r\nVan Dijk, who has led Nas… [+368 chars]"
  },
  {
      "source": {
          "id": null,
          "name": "CNBC"
      },
      "author": "Jenni Reid",
      "title": "Major central banks are on the brink of peak rates — but the inflation battle might not be over - CNBC",
      "description": "The European Central Bank, Federal Reserve and Bank of England are nearly done with interest rate rises, but inflation will continue to cause pain.",
      "url": "https://www.cnbc.com/2023/09/18/central-banks-head-for-peak-rates-but-inflation-battle-is-not-over.html",
      "urlToImage": "https://image.cnbcfm.com/api/v1/image/107301435-1694780687440-gettyimages-1665494864-GERMANY_ECB.jpeg?v=1695014338&w=1920&h=1080",
      "publishedAt": "2023-09-18T05:18:58Z",
      "content": "Christine Lagarde, president of the European Central Bank (ECB), at a rates decision news conference in Frankfurt, Germany, on Thursday, Sept. 14, 2023. The ECB raised interest rates again, acting fo… [+5495 chars]"
  },
  ]
}