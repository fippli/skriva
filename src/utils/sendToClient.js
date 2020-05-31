const { BrowserWindow } = require("electron");
const last = require("@codewell/last");

// Send data to the client on a
// message channel
const sendToClient = (data) => {
  console.log("Sending new state!!!");
  const window = last(BrowserWindow.getAllWindows());
  console.log(window);
  window.webContents.send("STATE_CHANGE", data);
};

module.exports = sendToClient;
