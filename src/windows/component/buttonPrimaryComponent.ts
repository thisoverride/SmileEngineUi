export const buttonPrimaryComponent = (props: any) => {
  return `
  <button 
  data-screen="${props.dateScreen}"
  type="button"
  class="${props.className}">
  ${props.textContent}
  </button>`;
};
