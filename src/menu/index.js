const { Menu } = require("electron");
const { save, saveAs, open } = require("../file");
const { preview } = require("../preview");
const { loadStyleSheet } = require("../preview/createPreview");
const exportToPdf = require("../file/exportToPDF");

const template = (app, isMac) => [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      isMac ? { role: "close" } : { role: "quit" },
      {
        label: "Save",
        click: save,
        accelerator: "CmdOrCtrl+S",
      },
      {
        label: "Save As...",
        click: saveAs,
      },
      {
        label: "Open File...",
        click: open,
        accelerator: "CmdOrCtrl+O",
      },
      { label: "Preview", click: preview, accelerator: "CmdOrCtrl+P" },
      { label: "Load Stylesheet", click: loadStyleSheet },
      { label: "Export To PDF", click: exportToPdf },
    ],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      // { role: "forcereload" },
      // { role: "toggledevtools" },
      // { type: "separator" },
      // { role: "resetzoom" },
      // { role: "zoomin" },
      // { role: "zoomout" },
      // { type: "separator" },
      // { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];

// Create application menu
const createMenu = (app) => {
  const isMac = process.platform === "darwin";
  const menu = Menu.buildFromTemplate(template(app, isMac));
  Menu.setApplicationMenu(menu);
};

module.exports = createMenu;
