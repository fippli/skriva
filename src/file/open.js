const fs = require("fs");
const { dialog } = require("electron");
const isDefined = require("@codewell/is-defined");
const { dispatch } = require("../state");

const getFileContents = (filePath) => fs.readFileSync(filePath).toString();

// Open a file
const open = () => {
  const [filePath] = dialog.showOpenDialogSync({
    properties: ["openFile"],
  });

  if (isDefined(filePath)) {
    const fileContent = getFileContents(filePath);

    dispatch({
      filePath,
      fileContent,
    });
  }
};

module.exports = open;
