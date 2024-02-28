import * as faceapi from 'face-api.js';

const video = document.getElementById("video");

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
]).then(startWebcam).then(faceRecognition);

function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getLabeledFaceDescriptions() {
  const labels = ["Devon", "David"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`./labels/${label}/${i}.png`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

// Fonction pour déverrouiller les fonctionnalités
function unlockFeatures() {
  // Ajoutez ici le code pour déverrouiller les fonctionnalités.
  // Par exemple, vous pourriez activer des boutons, afficher des éléments, etc.
  console.log("Fonctionnalités déverrouillées !");
}

// Fonction pour verrouiller les fonctionnalités
function lockFeatures() {
  // Ajoutez ici le code pour verrouiller les fonctionnalités.
  // Par exemple, désactivez des boutons, masquez des éléments, etc.
  console.log("Fonctionnalités verrouillées !");
}

async function faceRecognition() {
  video.addEventListener("play", async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };

    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      const results = resizedDetections.map((d) => {
        return faceMatcher.findBestMatch(d.descriptor);
      });

      let drawBox;
      let isFaceRecognized = false;

      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        if (result.distance < 0.5) {
          drawBox = new faceapi.draw.DrawBox(box, {
            label: result.toString(),
          });
          console.log(result.toString());
          drawBox.draw(canvas);

          // Déverrouiller des fonctionnalités lorsque le visage est reconnu
          unlockFeatures();
          isFaceRecognized = true;
        }
      });

      // Verrouiller des fonctionnalités si aucun visage n'est reconnu
      if (!isFaceRecognized) {
        lockFeatures();
      }
    }, 100);
  });
}
