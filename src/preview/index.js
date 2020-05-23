const { ipcMain, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");
const { createPreview } = require("./createPreview");
const baseDir = require("../config");

const showdown = require("showdown");
showdown.setOption("tables", true);
const converter = new showdown.Converter();

const PREVIEW_PATH = path.resolve(baseDir(), "preview.html");
fs.writeFileSync(PREVIEW_PATH, "");

let refreshed = false;

const preview = () => {
  previewWindow = new BrowserWindow({
    width: 920,
    height: 800,
    titleBarStyle: "hidden",
  });

  previewWindow.on("closed", () => {
    previewWindow = null;
  });

  previewWindow.webContents.openDevTools();

  const refresh = () => {
    if (previewWindow) {
      setTimeout(() => {
        if (refreshed === false) {
          previewWindow.loadURL(`file://${PREVIEW_PATH}`);
          refreshed = true;
        }
        refresh();
      }, 1000);
    }
  };

  refresh();
};

// Catch file changes
ipcMain.on("typing", (event, newFileContent) => {
  const html = converter.makeHtml(newFileContent);
  const doc = createPreview(html);
  fs.writeFileSync(PREVIEW_PATH, doc);
  refreshed = false;
});

module.exports = { preview };
