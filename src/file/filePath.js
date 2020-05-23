// Contains the state of the path to the edited file
let filePath = null;

const setFilePath = (nextFilePath) => {
  filePath = nextFilePath;
};

const getFilePath = () => filePath;

module.exports = {
  setFilePath,
  getFilePath,
};
