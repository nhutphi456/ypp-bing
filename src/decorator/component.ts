export function Component(config: { selector: string; template: string }) {
  return function (target: Function) {
    target.prototype.selector = config.selector;
    target.prototype.template = config.template;
  };
}