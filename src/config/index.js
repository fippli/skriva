// Define the working directory of
// for storing files
const { app } = require("electron");
const homedir = require("os").homedir();
const createDirIfItDoesntExist = require("@codewell/create-directory-if-it-doesnt-exist");

const baseDir = () => {
  const path = `${homedir}/.${app.name}`;
  createDirIfItDoesntExist(path);
  return path;
};

module.exports = baseDir;
