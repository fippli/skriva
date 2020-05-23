// Contains the state of the edited file
let fileContent = "";

const setFileContent = (nextFileContent) => {
  fileContent = nextFileContent;
};

const getFileContent = () => {
  return fileContent;
};

module.exports = {
  setFileContent,
  getFileContent,
};
