const { ipcRenderer } = require("electron");

ipcRenderer.on("file-opened", (_, { fileContent, filePath }) => {
  document.getElementById("textarea").value = fileContent;
  document.getElementById("file-path").textContent = filePath;
});

const typing = function (event) {
  ipcRenderer.send("typing", event.target.value);
};
