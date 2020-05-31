const { ipcRenderer } = require("electron");

// !
const setTextarea = (text) => {
  console.log("textarea update");
  document.getElementById("textarea").value = text;
};

// !
const setFilePath = (filePath) => {
  console.log("file path update");
  document.getElementById("file-path").textContent = filePath;
};

// !
const stateChange = (_, state) => {
  const { fileContent, filePath } = state;
  console.log("State change on client", fileContent, filePath);
  setTextarea(fileContent);
  setFilePath(filePath);
};

ipcRenderer.on("STATE_CHANGE", stateChange);

const typing = ({ target: { value } }) => {
  ipcRenderer.send("typing", value);
};
