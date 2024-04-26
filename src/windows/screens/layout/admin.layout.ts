export const adminLayout = (body: string) => {
  return (`
  <div class="sys-wrp">
      <div class="sys-state-bar">
          <time>12:17</time>
          <div class="metrics">
              network
          </div>
      </div>
      <div class="title-screen">Réglage système</div>
      ${body}
  </div>
  `)
};
