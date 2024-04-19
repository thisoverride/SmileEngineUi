export const buttonCameraComponent = (props: any) => {
  return `<button 
      type="button"
      ${props.dataScreen ? `data-screen=${props.dataScreen}` : "" }
      id="${props.id}" 
      class="${props.className}"
      style="background-image: url(icon/${props.iconName});"
      >
      ${props.textContent}
      </button>`;
};
