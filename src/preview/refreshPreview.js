const { readState, dispatch } = require("../state");

const refreshPreview = (previewWindow) => {
  const { fileContentReloadCache, fileContent, previewFilePath } = readState();

  if (previewWindow) {
    setTimeout(() => {
      if (fileContent !== fileContentReloadCache) {
        previewWindow.loadURL(`file://${previewFilePath}`);
        dispatch({ fileContentReloadCache: fileContent });
      }
      refreshPreview(previewWindow);
    }, 500);
  }
};

module.exports = refreshPreview;
