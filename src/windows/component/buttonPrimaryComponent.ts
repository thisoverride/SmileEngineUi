export const buttonPrimaryComponent = (props: any) => {

  return `
  <button 
  ${props.dataScreen ? `data-screen="${props.dataScreen}"` : ""}
  type="button"
  class="${props.className ?? 'btn-primary'}">
  ${props.textContent}
  </button>`;
};
