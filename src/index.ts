import { AdsComponent } from "./components/ads";
import { AppComponent } from "./components/app";
import { ChannelComponent } from "./components/channel";
import { FinanceComponent } from "./components/finance";
import { NewsComponent } from "./components/news";
import { NewsList } from "./components/newsList";
import { SportComponent } from "./components/sport";
import { AppModule } from "./controller/appModule";
import { NewsService } from "./services/newsService";

const app = new AppModule();

app.setRootComponent(AppComponent);

app.declareComponents(AppComponent, NewsList, NewsComponent, ChannelComponent, FinanceComponent, SportComponent, AdsComponent);
app.declareServices(NewsService)

app.run()