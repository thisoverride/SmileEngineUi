export const modalComponent = (props: any) => `

<div class="modal-container v-hidden">
	<div class="modal-head">
		<div id="modal-title">${props.title}</div>
		<button class="btn-mle" id="modal-action">annuler</button>
	</div>
	<div class="modal-body">
		<div class="qrcode">
			<div class="step-indicator text-center">
				<h3 class="pb-15">Scanner pour récupérer vos photos</h3>
				<h4>Suivez les étapes</h4>
			</div>
			<div class="qrcode-container text-center row">
				<div class="qrcode-img">
					<img src="public/error-2.png" />
					<div>Connexion à la borne</div>
				</div>
				<div class="qrcode-img">
					<img src="public/error-2.png" />
					<div>Accédez à Slurp</div>
				</div>
			</div>
		</div>
    <div class="print gap-30">
      <h3>
        Choisissez le nombre de copie et<br />
        lancez vos impressions :
      </h3>
      <div class="num-copy row">
        <div>-</div>
        <div class="num-of-copy">
          <span>3</span>
        </div>
        <div>+</div>
      </div>
    </div>
	</div>
</div>



`;

// ${buttonPrimaryComponent({ textContent: "Imprimer" })}
// impression

// <h3>Choisissez le nombre de copie et<br /> Impression en cours...:</h3>
// <div>logo d'impression</div>
