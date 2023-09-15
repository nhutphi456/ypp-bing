
export class NewsService {
  constructor() {}

  async getNews(){
    const response = await fetch("./services/news.json")
    return response.json()
  }
}
