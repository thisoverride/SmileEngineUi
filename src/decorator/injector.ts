export const InjectEvent = () => {
  return function(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const className: string = _target.constructor.name;
    const classNameSplit: string[] = className.split(/(?=[A-Z])/);

    if(!classNameSplit[classNameSplit.length -1].includes('Controller')){
      throw new Error('The target is not valide controller');
    }

    const index: number = classNameSplit.indexOf('Controller');
    classNameSplit.splice(index, 1);
    
    const scopeId: string = classNameSplit
    .map(word => `${word.substring(0, 2)}${word.slice(-1)}_`)
    .join('').toUpperCase() + 'CRL';


    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      const dataScreenTrggier: NodeListOf<HTMLElement> = document.querySelectorAll('[data-screen]');

      dataScreenTrggier.forEach((trigger: HTMLElement) => {
        const changeScreen = new CustomEvent('changeScreen',{
          detail: { 
            set: trigger.dataset.screen,
            params:'',
            emit: trigger.id,
            scope: scopeId
          },
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
