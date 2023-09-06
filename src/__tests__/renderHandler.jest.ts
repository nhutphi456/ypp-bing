import { BaseComponent } from "../base/component";
import { ComponentMetadata } from "../decorator/component";

describe("Test render handler", () => {
  let testComponent: TestComponent

  @ComponentMetadata({
    selector: "test",
    template: `
      <div data="channel">{{title}}</div>
    `,
  })
  class TestComponent extends BaseComponent {
    title = "test 1";
    channel = "VTC"
  }

  beforeEach(() => {
    testComponent = new TestComponent();
  })
  it("should render handler works", () => {
    const result = testComponent.render();

    // expect(result).toContain("<div>test 1</div>");
    expect(result).toContain(`<div data="&quot;VTC&quot;">test 1</div>`);
  });
});

/**
 * const view: string = this.viewBuilder.build(this)
 * const interpolateHandler = new InterpolateHandler()
 * const bindAttributeHandler = new BindAttributeHandler()
 * const bindNgForHandler = new BindNgForHandler()
 * interpolate.setNext(bindAttribute).setNext(bindNgFor)
 *
 *
 * build(instance){
 *
 * }
 */
