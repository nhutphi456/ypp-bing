import { AppComponent } from "./components/app";
import { News } from "./components/news/news";
import { NewsList } from "./components/news/newsList";
import { AppModule } from "./controller/appModule";
import { AppState } from "./controller/appState";
import { NewsService } from "./services/newsService";

const app = new AppModule();
const appState = AppState.getInstance().getStateSubject();

app.setRootComponent(AppComponent);
app.declareComponents(AppComponent, NewsList, News);
app.declareServices(NewsService);

appState.subscribe(async () => {
  await app.run();
});