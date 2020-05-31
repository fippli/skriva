const { BrowserWindow, dialog } = require("electron");
const { readState } = require("../state");
const writeFile = require("../utils/writeFile");

const exportToPDF = () => {
  const { baseDir } = readState();
  const win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(`file://${baseDir}/preview.html`);

  win.webContents.on("did-finish-load", () => {
    // Use default printing options
    win.webContents
      .printToPDF({})
      .then((data) => {
        const filePath = dialog.showSaveDialogSync({
          properties: ["createDirectory"],
        });
        writeFile(filePath)(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

module.exports = exportToPDF;
