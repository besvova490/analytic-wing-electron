const { Menu, app, shell } = require("electron");

// helpers
const { NAVIGATE_TO } = require("../ipcEvents/ipcEventsKeys");


module.exports = function createMenu(isDev, win) {
  const template = [
    {
      label: app.name,
      submenu: [
        { label: "Overview", click: () => win.webContents.send(NAVIGATE_TO, "/overview") },
        { label: "Feedback", click: () => win.webContents.send(NAVIGATE_TO, "/feedback") },
        { label: "Extension", click: () => win.webContents.send(NAVIGATE_TO, "/extension") },
        { label: "Settings", click: () => win.webContents.send(NAVIGATE_TO, "/settings") },
        { type: "separator" },
        { label: "Log Out", click: () => win.webContents.send(NAVIGATE_TO, "/sign-in") },
      ],
    },
    isDev && { role: "viewMenu" },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            await shell.openExternal("https://analytic-wing-test.vercel.app/");
          }
        }
      ]
    }
  ].filter(Boolean);

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};
