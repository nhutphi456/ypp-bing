import { AdsComponent } from "./components/ads";
import { AppComponent } from "./components/app";
import { ChannelComponent } from "./components/channel";
import { FinanceComponent } from "./components/finance";
import { ItemComponent } from "./components/item";
import { NewsComponent } from "./components/news";
import { NewsList } from "./components/newsList";
import { SportComponent } from "./components/sport";
import { TopNews } from "./components/topNews";
import { AppModule } from "./controller/appModule";
import { AppState } from "./controller/appState";
import { NewsService } from "./services/newsService";

import { skip } from "rxjs/operators";

const app = new AppModule();
const appState = AppState.getInstance();

app.setRootComponent(AppComponent);

app.declareComponents(
  AppComponent,
  FinanceComponent,
  AdsComponent,
  NewsList,
  NewsComponent,
  SportComponent,
  TopNews,
  ItemComponent,
  ChannelComponent,
);
app.declareServices(NewsService);

appState
  .getStateSubject()
  // .pipe(skip(1))
  .subscribe((state) => {
    console.log({ state });
    app.run();
  });
app.run()