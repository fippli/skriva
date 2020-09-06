const { dialog } = require("electron");
const isDefined = require("@codewell/is-defined");
const { readState, dispatch } = require("../state");
const writeFile = require("../utils/writeFile");

// Save filecontent and select a
// file path
const saveAs = () => {
  const dialogData = dialog.showSaveDialogSync({
    properties: ["createDirectory"],
  });

  if (!isDefined(dialogData)) {
    dispatch({ filePath: null });
  } else {
    const [filePath] = dialogData;
    dispatch({ filePath });
    const { fileContent } = readState();
    writeFile(filePath)(fileContent);
  }
};

module.exports = saveAs;
