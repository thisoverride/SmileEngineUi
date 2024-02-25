// import { appComponent } from "../component/AppComponent";
export const saverScreen = (): string => {
  return `
<div class="instruction">
  <h1>Touchez l'écran pour commencer</h1>
 
  <div class="test">
  <div class="container-selection">
  <h1>Choisissez un mode de capture</h1>
  <div class="row gap-30">
     <div class="o-apps">
        <div class="c-app__tile" data-bg-color="-app-color-1">
           <box-icon size='60px' color="#fff" type='solid' name='camera'></box-icon>
        </div>
     </div>
     <div class="o-apps">
        <div class="c-app__tile" data-bg-color="-app-color-2">
        <box-icon size='60px' color="#fff" name='infinite'></box-icon>
        </div>
     </div>
  </div>
</div>
  </div>
</div>
`;
};
