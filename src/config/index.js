// Define the working directory of
// for storing files
const createDirIfItDoesntExist = require("@codewell/create-directory-if-it-doesnt-exist");
const { readState } = require("../state");

const config = () => {
  // Configure directory for storing
  // program files
  const { baseDir } = readState();
  createDirIfItDoesntExist(baseDir);
};

module.exports = config;
