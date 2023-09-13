import { AdsComponent } from "./components/ads";
import { AppComponent } from "./components/app";
import { ChannelComponent } from "./components/channel";
import { FinanceComponent } from "./components/finance";
import { NewsComponent } from "./components/news";
import { NewsList } from "./components/newsList";
import { SportComponent } from "./components/sport";
import { AppModule } from "./controller/appModule";
import { NewsService } from "./services/newsService";
import { parseToHtmlElement } from "./utils/parsetoHtmlElement";


AppModule.setRootComponent(AppComponent);

AppModule.declareComponents(
  AppComponent,
  NewsList,
  NewsComponent,
  ChannelComponent,
  FinanceComponent,
  SportComponent,
  AdsComponent,
);

AppModule.declareServices(NewsService);

// AppModule.run();

const appEl = parseToHtmlElement("<app-root></app-root>").firstChild as HTMLElement;

AppModule.renderer.render(appEl, document.getElementById("app"));

