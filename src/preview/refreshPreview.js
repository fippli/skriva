const { readState } = require("../state");

let fileContentReloadCache = "";

const refreshPreview = (previewWindow) => {
  const { fileContent, previewFilePath } = readState();

  if (previewWindow) {
    setTimeout(() => {
      if (fileContent !== fileContentReloadCache) {
        previewWindow.loadURL(`file://${previewFilePath}`);
        fileContentReloadCache = fileContent;
      }
      refreshPreview(previewWindow);
    }, 500);
  }
};

module.exports = refreshPreview;
