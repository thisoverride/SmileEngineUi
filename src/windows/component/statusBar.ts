export const statusBar = (isVisible: boolean): string => {
  return isVisible
    ? `
    <div class="network">
      <box-icon name='wifi' color="#ffff"></box-icon>
     </div>
      <div id="pt_control" class="control-center crl_pos-0"></div>`
    : '';
};
