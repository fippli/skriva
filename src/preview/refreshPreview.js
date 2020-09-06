const { readState } = require("../state");

let fileContentReloadCache = "";

const refreshPreview = (previewWindow) => {
  const { fileContent, previewFilePath } = readState();

  if (previewWindow) {
    setTimeout(() => {
      if (fileContent !== fileContentReloadCache) {
        try {
          previewWindow.loadURL(`file://${previewFilePath}`);
          fileContentReloadCache = fileContent;
          refreshPreview(previewWindow);
        } catch (error) {
          // Window is most likely closed.
          // The recursion stops here.
        }
      } else {
        refreshPreview(previewWindow);
      }
    }, 500);
  }
};

module.exports = refreshPreview;
