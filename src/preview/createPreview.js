const fs = require("fs");
const { dialog } = require("electron");
let filePath = `${__dirname}/styles.css`;

const loadStyleSheet = () => {
  const [newPath] = dialog.showOpenDialogSync({
    properties: ["openFile"],
  });

  filePath = newPath;
};

const documentStyle = () => fs.readFileSync(filePath).toString();

const createPreview = (html) => {
  return `
  <!DOCTYPE HTML>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Fira+Code:300,400,500,600,700|Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Playfair+Display:400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.min.css">
    
  </head>
  <body>
    <style>
    ${documentStyle()}
    </style>

    <header></header>
    <main>
    ${html}
    </main>

    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-markup.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-javascript.min.js"></script>
  </body>
  
  </html>
  `;
};

module.exports = {
  createPreview,
  loadStyleSheet,
};
