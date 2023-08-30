import { Renderer } from "../controller/renderer";
import { ComponentDecorator } from "../decorator/component";

describe("Test renderer class", () => {
    let renderer: Renderer;
  
    @ComponentDecorator({
      selector: "test-component",
      template: `
        <div>
          {{title}}
          <news-component data="currentMessage"></news-component>
          <p>title: {{channel.name}}</p>
        </div>
      `,
    })
    class TestComponent {
      title = "Welcome to app";
      currentMessage = "Hello everyone";
      channel = { name: "Zing" };
    }
  
    beforeAll(() => {
      renderer = new Renderer();
    });
    it("should replace view", () => {
      const testComponent = new TestComponent();
      const result = renderer.interpolate(testComponent);
  
      expect(result).toContain(
        '<news-component data="&quot;Hello everyone&quot;"></news-component>'
      );
      expect(result).toContain("<p>title: Zing</p>")
    });
  });