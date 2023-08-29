export function ComponentDecorator(config: { selector: string; template: string }) {
  return function (target: any) {
    target.prototype.selector = config.selector;
    target.prototype.template = config.template;
  };
}

