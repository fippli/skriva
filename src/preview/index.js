const { BrowserWindow } = require("electron");
const refreshPreview = require("./refreshPreview");

const preview = () => {
  const previewWindow = new BrowserWindow({
    width: 920,
    height: 800,
    titleBarStyle: "hidden",
  });

  previewWindow.on("closed", () => {
    previewWindow = null;
  });

  refreshPreview(previewWindow);
};

module.exports = preview;
