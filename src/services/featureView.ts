import * as faceapi from 'face-api.js'
import * as handpose from '@tensorflow-models/handpose';


export default class featureView {
  public feature: DocumentFragment;
  

  constructor(feature: DocumentFragment) {
    this.feature = feature;
    this.init()
  }


  public init() {
   const dd = this.feature.querySelector('p')
   const liveImg = this.feature.querySelector('img') as HTMLImageElement


   window.ipcRenderer.on('live',(_event,param) => {
    liveImg!.src = param
    console.log('blob =>',param)
   })


  }


  public async handeGesture() {
    const model = await handpose.load();
    const video = document.getElementById('video') as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = video!.width;
    canvas.height = video!.height;
    document.getElementById('root')!.appendChild(canvas)

    // console.log(document.querySelector('Canvas'))

  }

  public async setup() {
    const image = this.feature.getElementById('image') as HTMLImageElement;
  
    // Load models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    ]);
  
    // Configure detection options
    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 256,
      scoreThreshold: 0.5
    });
  
    // Detect faces
    const detections = await faceapi.detectAllFaces(image, options).withFaceLandmarks();
  
    // Create a canvas element
    const canvas = faceapi.createCanvasFromMedia(image);
  
    // Append the canvas to the body
    document.body.append(canvas);
  
    // Set up styles for the canvas
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
  
    // Draw the rectangles with custom styles
    faceapi.draw.drawDetections(canvas, detections.map(det => det.detection), {
      drawRectOptions: {
        lineWidth: 2,
        boxColor: 'blue' // Change the box color to blue
      }
    });
  
    // Log the detections
    console.log(detections);
  }
  

  public ob () {
    return this
  }
}
