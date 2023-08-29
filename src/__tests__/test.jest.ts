import { AppComponent } from "../components/app";
import { ChannelComponent } from "../components/channel";
import { NewsComponent } from "../components/news";
import { NewsList } from "../components/newsList";
import { AppModule } from "../controller/appModule";

/**
 * @jest-environment jsdom 
 */

describe("Test declarations", () => {
  it("should component be declared", () => {
    const appModule = new AppModule()
    appModule.addComponent(NewsComponent)
    appModule.addComponent(NewsList)

    expect(appModule.declaration['news']).toBeTruthy()
    expect(appModule.declaration['news-list']).toBeTruthy()
  })
})

describe("Test run app module", () => {
  it("should app module render app component", () => {
    const appModule = new AppModule()
    appModule.setRootComponent(AppComponent)
    appModule.addComponent(AppComponent)
    appModule.addComponent(NewsComponent)
    appModule.addComponent(ChannelComponent)

    const result = appModule.run()

    expect(result).toContain(`<p>title: News 1</p>`)
    expect(result).toContain(`<span>VTC</span>`)
  })
})
// describe("Test Decorator", () => {
//   it("should decorator works properly", () => {
//     @ComponentDecorator({
//       selector: "news",
//       template: "<div>{{title}}</div>",
//     })
//     class NewsComponent {
//       title = "Hello";

//       build() {
//         let view = (this as any).template;
//         for (let key in this) {
//           view = view.replace(`{{${key}}}`, this[key]);
//         }
//         return view;
//       }
//     }

//     const news = new NewsComponent().build();

//     expect(news).toBe("<div>Hello</div>");
//   });
// });