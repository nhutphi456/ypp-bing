import { Observable } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import { map } from "rxjs/operators";

export class NewsService {
  constructor() {}

  getNews(): Observable<any> {
    return fromFetch("./services/news.json").pipe(
      map((response) => {
        return response.json()
      })
    );
  }
}
