import { AppComponent } from "../components/app";
import { ChannelComponent } from "../components/channel";
import { NewsComponent } from "../components/news";
import { NewsList } from "../components/newsList";
import { AppModule } from "../controller/appModule";
import { ComponentDecorator } from "../decorator/component";
import { Input } from "../decorator/input";

/**
 * @jest-environment jsdom
 */

describe("Test declarations", () => {
  it("should component be declared", () => {
    const appModule = new AppModule();
    appModule.declareComponent(NewsComponent);
    appModule.declareComponent(NewsList);

    expect(appModule.declaration["news"]).toBeTruthy();
    expect(appModule.declaration["news-list"]).toBeTruthy();
  });
});

describe("Test run app module", () => {
  it("should app module render app component", () => {
    const appModule = new AppModule();
    appModule.setRootComponent(AppComponent);
    appModule.declareComponent(AppComponent, NewsComponent, ChannelComponent)
    

    const result = appModule.run();

    expect(result).toContain(`<p>title: News 1</p>`);
    expect(result).toContain(`<span>VTC</span>`);
  });
});

// describe("Test pass data", () => {
//   let app: AppModule;
//   @ComponentDecorator({
//     selector: "parent-component",
//     template: `
//         <div>
//           <child-component data="currentMessage"></child-component>
//         </div>
//       `,
//   })
//   class ParentComponent {
//     currentMessage = "Hello";
//   }

//   @ComponentDecorator({
//     selector: "child-component",
//     template: "<p>{{data}}</p>",
//   })
//   class ChildComponent {
//     @Input() data: string;
//   }

//   beforeAll(() => {
//     app = new AppModule();
//     app.setRootComponent(ParentComponent);
//     app.declareComponent(ParentComponent);
//     app.declareComponent(ChildComponent);
//   });

//   it("should pass data from parent to child component", () => {
//     const result = app.run()

//     expect(result).toContain(`<p>Hello</p>`)
//   });
// });
