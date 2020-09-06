const { BrowserWindow } = require("electron");

const createNewWindow = () => {
  let newWindow = new BrowserWindow({
    width: 920,
    height: 800,
    titleBarStyle: "hidden",
  });

  newWindow.on("closed", () => (newWindow = null));

  return newWindow;
};

module.exports = createNewWindow;
