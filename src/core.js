const { ipcMain } = require("electron");
const fileEditEvent = require("./events/fileEditEvent");

// Register events
ipcMain.on("typing", fileEditEvent);
