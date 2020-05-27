const { ipcMain, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");
const { createPreview } = require("./createPreview");
const baseDir = require("../config");

const showdown = require("showdown");
showdown.setOption("tables", true);
const converter = new showdown.Converter();
const { getFileContent } = require("../file/fileContent");

const PREVIEW_PATH = path.resolve(baseDir(), "preview.html");
fs.writeFileSync(PREVIEW_PATH, "");

let contentCache = "";

const writePreviewFile = (_, newFileContent) => {
  const html = converter.makeHtml(newFileContent);
  const doc = createPreview(html);
  fs.writeFileSync(PREVIEW_PATH, doc);
};

const refresh = (previewWindow) => {
  if (previewWindow) {
    const fileContent = getFileContent();
    const refreshed = fileContent === contentCache;

    setTimeout(() => {
      if (refreshed === false) {
        previewWindow.loadURL(`file://${PREVIEW_PATH}`);
        contentCache = fileContent;
      }
      refresh(previewWindow);
    }, 500);
  }
};

const preview = () => {
  console.log("Previewing");
  const previewWindow = new BrowserWindow({
    width: 920,
    height: 800,
    titleBarStyle: "hidden",
  });

  previewWindow.on("closed", () => {
    previewWindow = null;
  });

  refresh(previewWindow);
};

// Catch file changes
ipcMain.on("typing", writePreviewFile);

module.exports = {
  preview,
  writePreviewFile,
};
