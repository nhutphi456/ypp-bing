import { AppComponent } from "./components/app/app";
import { Finance } from "./components/finance/finance";
import { News } from "./components/news/news";
import { NewsList } from "./components/news/newsList";
import { Sport } from "./components/sport/sport";
import { AppModule } from "./controller/appModule";
import { AppState } from "./controller/appState";
import { NewsService } from "./services/newsService";


const app = new AppModule();
const appState = AppState.getInstance().getStateSubject();

app.setRootComponent(AppComponent);
app.declareComponents(AppComponent, NewsList, News, Finance, Sport);
app.declareServices(NewsService);

appState.subscribe(() => {
  app.run();
});