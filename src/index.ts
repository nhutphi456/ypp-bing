import { AdsComponent } from "./components/ads";
import { AppComponent } from "./components/app";
import { ChannelComponent } from "./components/channel";
import { FinanceComponent } from "./components/finance";
import { NewsComponent } from "./components/news";
import { NewsList } from "./components/newsList";
import { SportComponent } from "./components/sport";
import { AppModule } from "./controller/appModule";
import { AppState } from "./controller/appState";
import { NewsService } from "./services/newsService";

import { skip } from "rxjs/operators";

const app = new AppModule();
const appState = AppState.getInstance();

app.setRootComponent(AppComponent);

app.declareComponents(
  AppComponent,
  NewsList,
  NewsComponent,
  ChannelComponent,
  FinanceComponent,
  SportComponent,
  AdsComponent
);
app.declareServices(NewsService);

app.run();

appState
  .getStateSubject()
  // .pipe(skip(1))
  .subscribe(() => {
    app.run();
  });
