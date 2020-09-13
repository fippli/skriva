const { dialog } = require("electron");
const isDefined = require("@codewell/is-defined");
const { readState, dispatch } = require("../state");
const writeFile = require("../utils/writeFile");
const sendToClient = require("../utils/sendToClient");

// Save filecontent and select a
// file path
const saveAs = () => {
  const filePath = dialog.showSaveDialogSync({
    properties: ["createDirectory"],
  });

  if (!isDefined(filePath)) {
    dispatch({ filePath: null });
  } else {
    dispatch({ filePath });
    const state = readState();
    const { fileContent } = state;
    writeFile(filePath)(fileContent);
    sendToClient(state);
  }
};

module.exports = saveAs;
