import { Component } from "../base/component";
import { NewsComponent } from "../components/news";
import { AppModule } from "../controller/appModule";
import { ComponentDecorator } from "../decorator/component";
import { Finance } from "../models/finance";
import { News } from "../models/news";

/**
 * @jest-environment jsdom 
 */

describe("App Module", () => {
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
    appModule.setRootComponent(appComponent);

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
          <news></news>
        </div>
      `
      )
      .build();
    appComponent.addChildSelector("news");
    const newsComponent = new Component<News>()
      .setSelector("news")
      .setTemplate("<div>title: {{title}} like: {{like}}</div>")
      .setData({ title: "News 1", like: 20 })
      .build();
    appModule.setRootComponent(appComponent);
    appModule.addComponent(appComponent);
    appModule.addComponent(newsComponent);

    const result = appModule.run();

    expect(result).toContain("<div>title: News 1 like: 20</div>");
  });

  it("should render grandchild component", () => {
    const appComponent = new Component()
      .setSelector("app")
      .setTemplate(
        `
        <div>
          Welcome to my app!
          <news></news>
        </div>
        `
      )
      .build();
    appComponent.addChildSelector("news");

    const newsComponent = new Component<News>()
      .setSelector("news")
      .setTemplate(
        `<div>
          title: {{title}} like: {{like}}
          <channel></channel>
        </div>`
      )
      .setData({ title: "News 1", like: 20 })
      .build();
    newsComponent.addChildSelector("channel");

    const channelComponent = new Component<{ name: string }>()
      .setSelector("channel")
      .setTemplate("<span>{{name}}</span>")
      .setData({ name: "VNExpress" })
      .build();

    appModule.setRootComponent(appComponent);
    appModule.addComponent(appComponent);
    appModule.addComponent(newsComponent);
    appModule.addComponent(channelComponent);

    const result = appModule.run();

    expect(result).toContain("<span>VNExpress</span>");
  });
});

describe("Test components", () => {
  let appModule: AppModule;
  let appComponent: Component<any>;

  beforeAll(() => {
    appModule = new AppModule();
    appComponent = new Component()
      .setSelector("app")
      .setTemplate(
        `
        <div>
          <news></news>
          <finance></finance>
        </div>
      `
      )
      .build();
    appModule.setRootComponent(appComponent);
    appModule.addComponent(appComponent);
  });

  it("should render multiple components", () => {
    const news = new Component<News>()
      .setSelector("news")
      .setTemplate(`<div><p>Title: {{title}}</p><p>Like: {{like}}</p></div>`)
      .setData({
        title: "News 1",
        like: 20,
      })
      .build();

    const finance = new Component<Finance>()
      .setSelector("finance")
      .setTemplate(`<span>{{code}} {{value}}</span>`)
      .setData({ code: "VNM", value: 100 })
      .build();

    appModule.addComponent(news);
    appModule.addComponent(finance);
    appComponent.addChildSelector("news");
    appComponent.addChildSelector("finance");

    const result = appModule.run();

    expect(result).toContain(`<div><p>Title: News 1</p><p>Like: 20</p></div>`);
    expect(result).toContain(`<span>VNM 100</span>`);
  });
});

describe("Test Decorator", () => {
  it("should decorator works properly", () => {
    @ComponentDecorator({
      selector: "news",
      template: "<div>{{title}}</div>",
    })
    class NewsComponent {
      title = "Hello";

      build() {
        let view = (this as any).template;
        for (let key in this) {
          view = view.replace(`{{${key}}}`, this[key]);
        }
        return view;
      }
    }

    const news = new NewsComponent().build();

    expect(news).toBe("<div>Hello</div>");
  });
});

/**
 * @NgModule({
 *    declarations: {}
 *    root
 * })
 * class AppModule
 *
 * @Component({
 *   selector: "",
 *   template: "<div>{{title}}</div>"
 * })
 * class NewsComponent {
 *  title = "news 1"
 *
 * }
 *
 * encounter selector -> create instance of the class and build the view
 */
