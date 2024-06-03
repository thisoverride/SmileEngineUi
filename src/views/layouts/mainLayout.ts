
export const mainLayout = () => {
  return `
  <div id="pt_control" class="control-center crl_pos-0"></div>
  <div id="app">
      <header class="layout-header">
          <div class="booth-icon"></div>
      </header>
      <main class="layout-main">
          <div class="layout-main-title row">
              <h2 id="main-title"></h2>
          </div>
          <div id="body"></div>
      </main>
      <footer class="layout-footer"></footer>
  </div>`
}
