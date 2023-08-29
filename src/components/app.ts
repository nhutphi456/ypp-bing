import { ComponentDecorator } from "../decorator/component";

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
export class AppComponent {}
