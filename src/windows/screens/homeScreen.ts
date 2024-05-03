import { modalComponent } from "../component/modalComponent";
export const homeScreen =  `
<div id="home-wrp" class="_home-wrp" data-screen="selectionView">
  <div class="hello-speak">

<div class="applogo" style="background-image: url('icon/smile-engine.png');"></div>
    <h1>
      Capturez des<br />
      souvenirs<br />
      inoubliables.
    </h1>
    <div class="indicator">
      Touchez l'écran pour<br />
      commencer
    </div>
  </div>
  ${modalComponent({title: "Warning"})}
</div>
  `;

