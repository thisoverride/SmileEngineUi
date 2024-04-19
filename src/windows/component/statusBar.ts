export const statusBar = `
<div id="_state_machine" class="_state_machine">
    <div class="waveStrength-1" id="wave">
        <div class="wv3 wave">
            <div class="wv2 wave">
                <div class="wv1 wave"></div>
            </div>
        </div>
    </div>
    <div class="_state_admin hidden">
        <box-icon name="power-off" color="#ffff"></box-icon>
    </div>
</div>
<div id="pt_control" class="control-center crl_pos-0"></div>

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
<div class="md-overlay hidden"></div>
`

