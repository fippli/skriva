const fs = require("fs");

const writeFile = (filePath) => (fileContent) => {
  try {
    fs.writeFileSync(filePath, fileContent);
  } catch (error) {
    console.error(error);
  }
};

module.exports = writeFile;
