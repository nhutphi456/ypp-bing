import { ComponentMetadata } from "../decorator/component";
import { BaseComponent } from "../base/component";
import { DataBinder } from "../helper/dataBinder";

describe("Test renderer class", () => {
  let dataBinder: DataBinder;

  @ComponentMetadata({
    selector: "test-component",
    template: `
      <div>
        {{title}}
        <news-component data="currentMessage"></news-component>
        <p>title: {{channel.name}}</p>
      </div>
    `,
  })
  class TestComponent extends BaseComponent {
    title = "Welcome to app";
    currentMessage = "Hello everyone";
    channel = { name: "Zing" };
  }

  beforeAll(() => {
    dataBinder = new DataBinder();
  });
  
  it("should replace view", () => {
    const testComponent = new TestComponent();
    const result = dataBinder.bindData(testComponent);

    expect(result).toContain('<news-component data="&quot;Hello everyone&quot;"></news-component>');
    expect(result).toContain("<p>title: Zing</p>");
  });
});
