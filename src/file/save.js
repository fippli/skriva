const isDefined = require("@codewell/is-defined");
const { readState } = require("../state");
const saveAs = require("./saveAs");
const writeFile = require("../utils/writeFile");

// Save filecontent to disk at
// the currently selected file path
const save = () => {
  const { filePath, fileContent } = readState();

  if (!isDefined(filePath)) {
    saveAs();
  } else {
    writeFile(filePath)(fileContent);
  }
};

module.exports = save;
