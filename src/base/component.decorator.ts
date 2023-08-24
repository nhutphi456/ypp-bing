export function Component(config: { selector: string }) {
  return function (target: Function) {
    // Add metadata to the constructor function
    target.prototype.selector = config.selector;
  };
}
