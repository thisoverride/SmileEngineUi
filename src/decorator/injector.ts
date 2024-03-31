export const InjectEvent = () => {
  return function(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      const dataScreenTrggier: NodeListOf<HTMLElement> = document.querySelectorAll('[data-screen]');

      dataScreenTrggier.forEach((trigger: HTMLElement) => {
        const changeScreen = new CustomEvent('changeScreen',{
          detail: { set: trigger.dataset.screen},
          bubbles: true,
          cancelable: true
        });
        trigger.addEventListener('click', () => trigger.dispatchEvent(changeScreen));
      });
      return result;
    };

    return descriptor;
  };
};
