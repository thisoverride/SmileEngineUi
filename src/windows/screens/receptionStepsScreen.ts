import { modalComponent } from "../component/modalComponent";
import { buttonPrimaryComponent } from "../component/buttonPrimaryComponent";
export const receptionStepsScreen =  `
<div class="_home-wrp">
	<div id="selection-wrp" class="_mode_selection_wrp">
		<div class="logo">
		<div class="applogo" style="background-image: url('icon/smile-engine.png');"></div>
		</div>
		<div class="col align-items-center gap-30">
			<div id="indicator-selection" class="poop"></div>
			<div class="row w-100 justify-center">
				<div class="col align-items-center justify-center text-center gap-30">
					<h1>
						Imprimez, <br />
						Scannez,
						<br />
						&<br />
						Recommencer !
					</h1>
					<div class="col justify-center gap-20">
          <div class="border-container row align-items-center">
          <div id="printer" class="overlay-click"></div>
            <button class="btn-printer"></button>
							<div class="border-text">
								<p>Imprimer une ou plusieurs copies de la photo</p>
							</div>
						</div>
						<div  class="border-container row align-items-center">
            <div id="qrcode" class="overlay-click"></div>
							<button class="btn-qrcode"></button>
							<div class="border-text">
								<p>Imprimer une ou plusieurs copies de la photo</p>
							</div>
						</div>
						<div>
            <a id="timer" href="#">
            ${buttonPrimaryComponent({ id:"home", textContent: "Retour à l'acceuil" })}
            </a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	${modalComponent({title:"aaz"})}
</div>

  `;

