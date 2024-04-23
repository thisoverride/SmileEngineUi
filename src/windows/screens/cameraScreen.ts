import { buttonCameraComponent } from "../component/buttonCameraComponent";

export const cameraScreen = (isPhotoScreen: boolean) => {
  return `
    <div class="camera-wrp">
      <div class="live-camera">
        <canvas class="canvas-test"></canvas>
        <div class="v-hidden" id="counter"></div>
      </div>
      <div class="row align-items-center camera-control">
        ${
          isPhotoScreen
            ? buttonCameraComponent({
                id: "btn-return",
                className: "previous",
                textContent: "",
                iconName: "previous.png",
                dataScreen: "optionPhotoView",
              }) +
              buttonCameraComponent({
                id: "btn-camera",
                className: "btn-camera",
                textContent: "",
                iconName: "camera.png",
              })
            : 
            buttonCameraComponent({
                id: "btn-return",
                className: "previous",
                textContent: "",
                iconName: "previous.png",

              }) +
              buttonCameraComponent({
                id: "btn-camera",
                className: "btn-camera",
                textContent: "",
                iconName: "loop.png",
              })
        }
        <div class="timer-wrp">
          <div class="data-select">
            <div class="data-list">
              <div id="3">3 s</div>
              <div id="5">5 s</div>
              <div id="10">10 s</div>
            </div>
            <div class="data-selected">
              <div>
                <img class="sme-icon" src="icon/timer.png">
              </div>
              <div id="selected"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
