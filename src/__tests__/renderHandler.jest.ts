import { BaseComponent } from "../base/component";
import { AppModule } from "../controller/appModule";
import { ComponentMetadata } from "../decorator/component";
import { HtmlParser } from "../helper/htmlParser";

describe("Test render handler", () => {
  let testComponent: TestComponent;
  let htmlParser: HtmlParser;

  @ComponentMetadata({
    selector: "test",
    template: `
      <div data="channel">{{title}}</div>
      <div>
        <div>firstName: {{student.name.firstName}}</div>
        <div>lastName: {{student.name.lastName}}</div>
      </div>
      <child-component *ngFor="let item of list" data="item" ></child-component>
    `,
  })
  class TestComponent extends BaseComponent {
    title = "test 1";
    channel = "VTC";
    list = ["item 1", "item 2", "item 3"];
    student = {
      name: {
        firstName: "Jason",
        lastName: "Hudson"
      },
      age: 18
    }
  }

  beforeEach(() => {
    testComponent = new TestComponent();
    htmlParser = new HtmlParser();
  });

  it("should render handler works", () => {
    const result = testComponent.render();
    const html = htmlParser.parseToHtmlElement(result);
    const children = html.getElementsByTagName("child-component");

    expect(result).toContain(`<div data="&quot;VTC&quot;">test 1</div>`);
    expect(result).toContain("<div>firstName: Jason</div>")
    expect(result).toContain("<div>lastName: Hudson</div>")
    expect(children.length).toBe(3);
    // expect(result).toBe("");
  });
});

describe("Test NgFor", () => {
  let app: AppModule, htmlParser: HtmlParser

  @ComponentMetadata({
    selector: "parent-component",
    template: `
      <div>{{title}}</div>
      <child-component *ngFor="let item of list" data="item"></child-component>
    `,
  })
  class ParentComponent extends BaseComponent {
    title = "hello from parent";
    channel = "VTC";
    list = ["item 1", "item 2", "item 3"];
  }

  @ComponentMetadata({
    selector: "child-component",
    template: `
      <div class="child-item">{{data}}</div>
    `,
  })
  class ChildComponent extends BaseComponent {
    data;
  }

  beforeEach(() => {
    htmlParser = new HtmlParser()

    app = new AppModule();
    app.setRootComponent(ParentComponent);
    app.declareComponents(ParentComponent, ChildComponent);
  });

  it("should ngFor render 3 component", () => {
    const result = app.run()
    const html = htmlParser.parseToHtmlElement(result)
    const childrenItem = html.getElementsByClassName("child-item")

    expect(childrenItem.length).toEqual(3)
    expect(childrenItem[0].innerHTML).toBe("item 1")
    expect(childrenItem[1].innerHTML).toBe("item 2")
    expect(childrenItem[2].innerHTML).toBe("item 3")
  });
});