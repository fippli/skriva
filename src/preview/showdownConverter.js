const showdown = require("showdown");

// Showdown config
showdown.setOption("tables", true);
showdown.setOption("strikethrough", true);
showdown.setOption("tasklists", true);

const converter = new showdown.Converter();
const markdownToHtml = (markdown) => converter.makeHtml(markdown);

module.exports = markdownToHtml;
