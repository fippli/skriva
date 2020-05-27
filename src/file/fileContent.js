// Contains the state of the edited file
let fileContent = "";

const setFileContent = (_, nextFileContent) => {
  fileContent = nextFileContent;
};

const getFileContent = () => {
  return fileContent;
};

module.exports = {
  setFileContent,
  getFileContent,
};
