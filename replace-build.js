const fs = require('fs');
const path = require('path');

const fatalErrorProd = `
  document.body.style.backgroundColor = "#000";
  document.body.innerHTML = 
  '<div class="_fatal-error-wrp">' +
  '<div class="_fatal-error">' +
  '<div>!</div>' +
  '</div>' +
  '<div class="error-code">' +
  '<p class="pb-15">smileengine.com/support</p>' +
  '<span><code>EFOP-3</code></span>' +
  '</div>' +
  '</div>';
`;

const errorDevToReplace = `
  document.body.style.backgroundColor = "#060606d0";
  document.body.innerHTML = 
  '<div id="_err" class="err-container">' +
  '<div class="error-indicator">' +
  '<img id="_err_ico_loader" src="icon/err/err_d.png">' +
  '</div>' +
  '<div id="_err_body" class="_err">' +
  '<h3> > ${TitleError[0] ?? errorStringify}</h3>' +
  '<span>${detailError[0] ?? error.stack}</span>' +
  '<span>${detailError[1] ?? ''}</span>' +
  '</div>' +
  '</div>';
`;

function readTSFile(filePath) {
  try {
    // Obtenir le chemin absolu du fichier
    const absolutePath = path.join(__dirname, filePath);
    // Lecture du contenu du fichier
    const content = fs.readFileSync(absolutePath, 'utf8');
    return content;
  } catch (err) {
    // Gestion des erreurs en cas de problème de lecture du fichier
    console.error(`Erreur lors de la lecture du fichier : ${err}`);
    return null;
  }
}

// Exemple d'utilisation de la méthode
const filePath = 'src/main.ts'; 
const fileContent = readTSFile(filePath);
if (fileContent !== null) {
  const test = fileContent.replace(errorDevToReplace, fatalErrorProd)
  console.log(`Contenu du fichier :\n${test}`);
}
