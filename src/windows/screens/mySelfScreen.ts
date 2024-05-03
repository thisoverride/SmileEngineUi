import { buttonPrimaryComponent } from "../component/buttonPrimaryComponent";
export const mySelfScreen =  `
<div class="myself-wrp">

	<div class="smile-engine-logo">
		<div class="smile-engine-logo-applogo" style="background-image: url('icon/smile-engine.png');"></div>
	</div>

	<div class="col w-100 gap-80 btn-container">
		<div id="indicator-selection" class="text-indicator-selection"></div>
		<canvas class="canvas-test hidden"></canvas>
		<div class="ask text-center slide-content">Comment ça marche ?</div>
		<div class="col introducion-slide slide-content animate__animated animate__fadeIn">
			<div class="ask-container row">
				<div class="col">
					<div class="ico-camera"></div>
					<div>Vous vous faites photographier pendant l'événement</div>
				</div>

				<div class="col">
					<div class="ico-face"></div>
					<div>Scannez votre visage avec Myself</div>
				</div>
			</div>

			<div class="ask-container row">
				<div class="col">
					<div>- icone nuage</div>
					<div>À chaque nouvelle prise de photo, vos images sont automatiquement ajoutées à votre espace</div>
				</div>

				<div class="col">
					<div class="ico-qr"></div>
					<div>Vérifier vos photos et validez pour accéder à votre espace de stockage via QRcode</div>
				</div>
			</div>
			
		</div>
	</div>
	<div class="row gap-80 w-100 justify-center">
		${buttonPrimaryComponent({ 
			id:"btn-action-return", 
			className: "btn-secondary btn-collage-action", 
			textContent: "Précédent" 
		})} 
		${buttonPrimaryComponent({ 
			id:"btn-action-next", 
			className: "btn-primary btn-collage-action",
			textContent: "Commencer"
	 })}
	</div>
</div>
`;
