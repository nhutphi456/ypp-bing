import { Component } from "../base/component";
import { NewsComponent } from "../components/news";
import { AppModule } from "../controller/appModule";
import { News } from "../models/news";

describe("App module", () => {
  let appModule: AppModule;

  beforeAll(() => {
    appModule = new AppModule();
  });

  it("should app module render app component properly", () => {
    const appComponent = new Component()
      .setSelector("app")
      .setTemplate("<div>Welcome to my app!</div>")
      .build();

    appModule.addComponent(appComponent);
    appModule.setRootComponent(appComponent)

    const result = appModule.run();

    expect(result).toBe("<div>Welcome to my app!</div>");
  });

  it("should render news component inside app component", () => {
    const appComponent = new Component()
      .setSelector("app")
      .setTemplate(
        `
        <div>
          Welcome to my app!
          <news/>
        </div>
      `
      )
      .build();
    appComponent.addChildComponent("news");

    const newsComponent = new Component<News>()
      .setSelector("news")
      .setTemplate("<div>title: {{title}} like: {{like}}</div>")
      .setData({ title: "News 1", like: 20 })
      .build();

    appModule.addComponent(appComponent);
    appModule.addComponent(newsComponent);

    const result = appModule.render("app");
    expect(result).toContain("<div>title: News 1 like: 20</div>");
  });

  it("should render grandchild component", () => {
    const appComponent = new Component()
      .setSelector("app")
      .setTemplate(
        `
        <div>
          Welcome to my app!
          <news/>
        </div>
      `
      )
      .build();
    appComponent.addChildComponent("news");

    const newsComponent = new Component<News>()
      .setSelector("news")
      .setTemplate(
        `<div>
          title: {{title}} like: {{like}}
          <channel/>
        </div>`
      )
      .setData({ title: "News 1", like: 20 })
      .build();
    newsComponent.addChildComponent("channel");

    const channelComponent = new Component<{ name: string }>()
      .setSelector("channel")
      .setTemplate("<span>{{name}}</span>")
      .setData({ name: "VNExpress" })
      .build();

    appModule.addComponent(appComponent);
    appModule.addComponent(newsComponent);
    appModule.addComponent(channelComponent);
    
    const result = appModule.render("app")

    expect(result).toContain("<span>VNExpress</span>")
    // expect(result).toBe("<span>VNExpress</span>")
  });
});
