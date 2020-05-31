const { dialog } = require("electron");
const { dispatch } = require("../state");

const loadStyleSheet = () => {
  const [newPath] = dialog.showOpenDialogSync({
    properties: ["openFile"],
  });

  dispatch({ styleSheet: newPath });
};

module.exports = loadStyleSheet;
