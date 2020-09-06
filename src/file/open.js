const fs = require("fs");
const { dialog } = require("electron");
const isDefined = require("@codewell/is-defined");
const { dispatch } = require("../state");

const getFileContents = (filePath) => fs.readFileSync(filePath).toString();

// Open a file
const open = () => {
  const dialogData = dialog.showOpenDialogSync({
    properties: ["openFile"],
  });

  if (isDefined(dialogData)) {
    const [filePath] = dialogData;
    const fileContent = getFileContents(filePath);

    dispatch(
      {
        filePath,
        fileContent,
      },
      true,
    );
  }
};

module.exports = open;
