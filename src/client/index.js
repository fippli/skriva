const { ipcRenderer } = require("electron");

// !
const setTextarea = (text) => {
  document.getElementById("textarea").value = text;
};

// !
const setFilePath = (filePath) => {
  document.getElementById("file-path").textContent = filePath;
};

// !
const stateChange = (_, state) => {
  const { fileContent, filePath } = state;
  setTextarea(fileContent);
  setFilePath(filePath);
};

ipcRenderer.on("STATE_CHANGE", stateChange);

const typing = ({ target: { value } }) => {
  ipcRenderer.send("typing", value);
};
