export const accessControl = `
<div class="mle-system-wrp hidden">
  <div class="mle-header">
    <div class="mle-title">Access control</div>
    <button class="btn-mle">Annuler</button>
  </div>
  <div class="mle-body">
  <div class="anti-force-password v-hidden">
  Trop de tentatives incorrectes. Veuillez réessayer plus tard.
  </div>
    <div class="digit-wrp">
    <div class="pass-indicator">
      ${Array.from({ length: 6 }, (_, index) => `<span class="indicator-circle" id="${index}"></span>`).join('')}
    </div>
      <div id="digit" class="digit">
        ${Array.from({ length: 10 }, (_, index) => `<span id="${index}" >${index}</span>`).join('')}
      </div>
   </div>
  </div>
</div>
`

