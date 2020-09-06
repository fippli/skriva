const refreshPreview = require("./refreshPreview");
const createNewWindow = require("../utils/createNewWindow");

const preview = () => {
  let previewWindow = createNewWindow();
  refreshPreview(previewWindow);
};

module.exports = preview;
