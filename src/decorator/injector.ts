export const InjectEvent = () => {
  return function(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      const dataScreenTrggier: NodeListOf<HTMLElement> = document.querySelectorAll('[data-screen]');

      dataScreenTrggier.forEach((trigger: HTMLElement) => (this as any).dispatchEvent(trigger));
      return result;
    };

    return descriptor;
  };
};
