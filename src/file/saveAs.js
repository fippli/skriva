const { dialog } = require("electron");
const isDefined = require("@codewell/is-defined");
const { readState, dispatch } = require("../state");
const writeFile = require("../utils/writeFile");

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
    const { fileContent } = readState();
    writeFile(filePath)(fileContent);
  }
};

module.exports = saveAs;
