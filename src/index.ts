import { AppComponent } from "./components/app";
import { NewsSlider } from "./components/newsSlider";
import { NewsSliderItem } from "./components/newsSliderItem";
import { AppModule } from "./controller/appModule";
import { AppState } from "./controller/appState";
import { NewsService } from "./services/newsService";

const app = new AppModule();
const appState = AppState.getInstance().getStateSubject();

app.setRootComponent(AppComponent);
app.declareComponents(
  AppComponent,
  NewsSlider,
  NewsSliderItem
);
app.declareServices(NewsService);

appState.subscribe(() => {
  app.run();
});


