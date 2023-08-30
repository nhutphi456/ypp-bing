import { AppComponent } from "../components/app";
import { ChannelComponent } from "../components/channel";
import { NewsComponent } from "../components/news";
import { NewsList } from "../components/newsList";
import { AppModule } from "../controller/appModule";
import { Renderer } from "../controller/renderer";
import { ComponentDecorator } from "../decorator/component";
import { Input } from "../decorator/input";

/**
 * @jest-environment jsdom
 */

describe("Test declarations", () => {
  it("should component be declared", () => {
    const appModule = new AppModule();
    appModule.declareComponents(NewsComponent);

    expect(appModule.declaration["news"]).toBeTruthy();
    
  });
});

describe("Test render app component", () => {
  let app: AppModule;

  @ComponentDecorator({
    selector: "app-root",
    template: `<div><p>Welcome to my app!</p></div>`,
  })
  class AppComponent {}

  it("should app module render app component", () => {
    app = new AppModule();
    app.setRootComponent(AppComponent);
    app.declareComponents(AppComponent);

    const result = app.run();

    expect(result).toBe("<div><p>Welcome to my app!</p></div>");
  });
});

describe("Test render multiple components", () => {
  let app: AppModule;

  @ComponentDecorator({
    selector: "app-root",
    template: `
    <div>
        Welcome to my app!
        <news></news>
        <news></news>
    </div>
  `,
  })
  class AppComponent {}
  @ComponentDecorator({
    selector: "news",
    template: `
      <div>
        <p>title: {{title}}</p>
        <channel></channel>
      </div>
    `,
  })
  class NewsComponent {
    title = "News 1";
    constructor() {}
  }

  @ComponentDecorator({
    selector: "channel",
    template: "<span>{{name}}</span>",
  })
  class ChannelComponent {
    name = "VTC";
  }
  beforeAll(() => {
    app = new AppModule();
    app.setRootComponent(AppComponent);
    app.declareComponents(AppComponent, NewsComponent, ChannelComponent);
  });

  it("should app module render app component", () => {
    const result = app.run();

    expect(result).toContain(`<p>title: News 1</p>`);
    expect(result).toContain(`<span>VTC</span>`);
  });
});

describe("Test pass data", () => {
  let app: AppModule;
  @ComponentDecorator({
    selector: "parent-component",
    template: `
        <div>
          <child-component data="currentMessage"></child-component>
        </div>
      `,
  })
  class ParentComponent {
    currentMessage = "Hello";
  }

  @ComponentDecorator({
    selector: "child-component",
    template: "<p>{{data}}</p>",
  })
  class ChildComponent {
    @Input() data: string;
  }

  beforeAll(() => {
    app = new AppModule();
    app.setRootComponent(ParentComponent);
    app.declareComponents(ParentComponent, ChildComponent);
  });

  it("should pass data from parent to child component", () => {
    const result = app.run();

    expect(result).toContain(`<p>Hello</p>`);
    // expect(result).toBe("");
  });
});

describe("Test pass data", () => {
  let app: AppModule;
  @ComponentDecorator({
    selector: "parent-component",
    template: `
        <div>
          <child-component data="item"></child-component>
        </div>
      `,
  })
  class ParentComponent {
    item = { title: "Hello", like: 20 };
  }

  @ComponentDecorator({
    selector: "child-component",
    template:  `
      <div>
        <p>Title: {{data.title}}</p>
        <p>Like: {{data.like}}</p>
      </div>
    `,
  })
  class ChildComponent {
    @Input() data;
  }

  beforeAll(() => {
    app = new AppModule();
    app.setRootComponent(ParentComponent);
    app.declareComponents(ParentComponent, ChildComponent);
  });

  it("should pass data from parent to child component", () => {
    const result = app.run();

    expect(result).toContain(`<p>Title: Hello</p>`);
    expect(result).toContain(`<p>Like: 20</p>`);
    // expect(result).toBe("");
  });
});

