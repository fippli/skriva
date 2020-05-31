const fs = require("fs");
const markdownToHtml = require("./showdownConverter");
const createPreview = require("./createPreview");
const writeFile = require("../utils/writeFile");
const chain = require("@codewell/chain");

const writePreviewFile = ({ previewFilePath, fileContent, styleSheet }) => {
  const style = fs.readFileSync(styleSheet).toString();
  const html = chain(fileContent, markdownToHtml, createPreview(style));
  writeFile(previewFilePath)(html);
};

module.exports = writePreviewFile;
