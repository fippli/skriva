const { BrowserWindow, dialog } = require("electron");
const fs = require("fs");
const baseDir = require("../config");

const exportToPDF = () => {
  const win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(`file://${baseDir()}/preview.html`);

  win.webContents.on("did-finish-load", () => {
    // Use default printing options
    win.webContents
      .printToPDF({})
      .then((data) => {
        const filePath = dialog.showSaveDialogSync({
          properties: ["createDirectory"],
        });
        fs.writeFile(filePath, data, (error) => {
          if (error) throw error;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

module.exports = exportToPDF;
