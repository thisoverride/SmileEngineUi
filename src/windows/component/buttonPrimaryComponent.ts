export const buttonPrimaryComponent = (props: any) => {

  return `
  <button 
  ${props.dataScreen ? `data-screen="${props.dataScreen}"` : ""}
  type="button"
  ${props.id ?  `id="${props.id}"` : ""}
  class="${props.className ?? 'btn-primary'}">
  ${props.textContent}
  </button>`;
};
