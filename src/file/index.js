const fs = require("fs");
const { ipcMain, dialog, BrowserWindow } = require("electron");
const isDefined = require("@codewell/is-defined");
const showdown = require("showdown");
const { setFileContent, getFileContent } = require("./fileContent");
const { setFilePath, getFilePath } = require("./filePath");
const { writePreviewFile } = require("../preview");

// Showdown config
showdown.setOption("tables", true);
showdown.setOption("strikethrough", true);
showdown.setOption("tasklists", true);

// Update content on typing
// Catch file changes
ipcMain.on("typing", setFileContent);

const sendToClient = (message, data) => {
  const [window] = BrowserWindow.getAllWindows();
  window.webContents.send(message, data);
};

// Save filecontent and select a
// file path
const saveAs = () => {
  const filePath = dialog.showSaveDialogSync({
    properties: ["createDirectory"],
  });

  if (!isDefined(filePath)) {
    setFilePath(null);
    console.log("The file was not saved");
  } else {
    setFilePath(filePath);
    const fileContent = getFileContent();
    fs.writeFileSync(filePath, fileContent);
  }
};

// Save filecontent to disk
// at the currently selected file
// path
const save = () => {
  const filePath = getFilePath();
  if (!isDefined(filePath)) {
    saveAs();
  } else {
    const fileContent = getFileContent();
    fs.writeFileSync(filePath, fileContent);
  }
};

// Open a file
const open = () => {
  const [filePath] = dialog.showOpenDialogSync({
    properties: ["openFile"],
  });
  const fileContent = fs.readFileSync(filePath).toString();
  setFilePath(filePath);
  setFileContent(null, fileContent);
  writePreviewFile(null, fileContent);
  sendToClient("file-opened", { fileContent, filePath });
};

module.exports = {
  save,
  saveAs,
  open,
};
