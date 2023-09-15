import { lastValueFrom } from "rxjs";
import { BaseComponent } from "../base/component";
import { AppState } from "../controller/appState";
import { ComponentMetadata } from "../decorator/component";

describe("App State", () => {
  let appState: AppState;

  class TestService {
    getTitle() {
      return new Promise<string>((resolve) => {
        setTimeout(() => resolve("Test 2"), 1000);
      });
    }
  }

  @ComponentMetadata({
    selector: "test",
    template: `
        <div>
            Title: {{title}}
        </div>
    `,
  })
  class TestComponent extends BaseComponent {
    title = "Test 1";

    constructor(private testService: TestService) {
      super();
      this.loadTitle();
    }

    async loadTitle() {
      this.title = await this.testService.getTitle();
    }
  }

  beforeAll(() => {
    appState = AppState.getInstance();
  });

  it("should testComponent state be added to app state", async () => {
    const testComponent = new TestComponent(new TestService());

    appState.add(testComponent);

    const stateObs = appState.getStateSubject()
    
     expect(lastValueFrom(stateObs)).resolves.toBe({})
    // expect(1).toBe(1)
  });
});
