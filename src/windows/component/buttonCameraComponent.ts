export const buttonCameraComponent = (props: any) => {
  return `<button 
      type="button" 
      id=${props.id} 
      class="${props.className}"
      style="background-image: url(icon/${props.iconName});"
      >
      ${props.textContent}
      </button>`;
};
