const path = require("path");
const { app, BrowserWindow } = require("electron");
require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";
let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    fullscreen: true,
    webPreferences: { nodeIntegration: true, },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  await win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.setAsDefaultProtocolClient("analytic-wing-electron");

app.on("open-url", function (event, url) {
  event.preventDefault();

  console.log(url);
  win.focus();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
