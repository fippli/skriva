const path = require("path");
const { app } = require("electron");
const homedir = require("os").homedir();
const reducer = require("./reducer");
const sendToClient = require("../utils/sendToClient");
const writePreviewFile = require("../preview/writePreviewFile");

const baseDir = `${homedir}/.${app.name}`;

const initialState = {
  filePath: null,
  fileContent: "",
  fileContentReloadCache: "",

  // Base dir should not be possible to change
  baseDir,
  previewFilePath: `${baseDir}/preview.html`,

  // Style sheet
  styleSheet: path.resolve(__dirname, "../preview/styles.css"),
};

// !
// Side effects when the state updates
const effects = (nextState, updateClient) => {
  if (updateClient) {
    sendToClient(nextState);
  }

  writePreviewFile(nextState);
};

// ! Mutable state
let state = initialState;

const dispatch = (update, updateClient = false) => {
  const nextState = reducer(update)(state);
  if (process.env.NODE_ENV === "development") {
    console.log("Next state:", nextState);
  }

  state = nextState;
  effects(nextState, updateClient);
};

const readState = () => ({ ...state });

module.exports = {
  dispatch,
  readState,
};
