import { buttonPrimaryComponent } from "./buttonPrimaryComponent";
export const modalComponent = (props: any) => `

<div class="mle-reception ">
  <div class="mle-header">
    <div class="mle-title">${props.title}</div>
    <button class="btn-mle">Annuler</button>
  </div>
  <div class="mle-body">


    <div id="home-wrp" class="_home-wrp">
      <div class="hello-speak">
      <div class="applogo" style="background-image: url('/smile-engine.png');"></div>
<h3>Choisissez le nombre de copie et<br /> lancez vos impressions :</h3>
<div class="test-photo"></div>
<div class="num-copy row">
<div>-</div>
<div class="num-of-copy">
<span>3</span>
</div>
<div>+</div>
</div>
<div class="btn-next">
${buttonPrimaryComponent({ textContent: "Imprimer" })}
</div>
   
        
      </div>
    </div>  

    
  </div>
</div>
`;

// impression

// <h3>Choisissez le nombre de copie et<br /> Impression en cours...:</h3>
// <div>logo d'impression</div>
