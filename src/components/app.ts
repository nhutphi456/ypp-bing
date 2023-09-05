import { ComponentMetadata } from "../decorator/component";

@ComponentMetadata({
  selector: "app-root",
  template: `
    <div>
        Welcome to my app!
        <news></news>
        <news></news>
    </div>
  `,
})
export class AppComponent {}
