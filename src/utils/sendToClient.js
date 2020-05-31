const { BrowserWindow } = require("electron");
const last = require("@codewell/last");

// Send data to the client on a
// message channel
const sendToClient = (data) => {
  const window = last(BrowserWindow.getAllWindows());
  window.webContents.send("STATE_CHANGE", data);
};

module.exports = sendToClient;
