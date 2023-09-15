import { BehaviorSubject } from "rxjs";

export class AppState {
  private static instance: AppState;
  private state = {};
  private stateSubject = new BehaviorSubject(this.state);

  private constructor() {}

  static getInstance(): AppState {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }
    return AppState.instance;
  }

  getState() {
    return this.state;
  }

  getStateSubject() {
    return this.stateSubject.asObservable();
  }

  add(instance): void {
    const stateKey = instance.getMetadata().selector;
    this.state[stateKey] = instance;
    // this.stateSubject.next({ ...this.state });
  }

  update(instance): void {
    const stateKey = instance.getMetadata().selector;
    this.stateSubject.next({
      ...this.state,
      [stateKey]: instance,
    });
  }
}
