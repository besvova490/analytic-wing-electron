/* eslint-disable init-declarations */
const { app } = require("electron");
require("dotenv").config();

// utils
const MainWindow = require("./utils/MainWindow");

// helpers
const appEventsHandler = require("./helpers/appEventsHandler");
const ipcEvents = require("./ipcEvents");
const updater = require("./helpers/updater");

const isDev = process.env.NODE_ENV === "development";
let win;

async function createWindow() {
  win = new MainWindow(isDev);
  await win.initialize();

  appEventsHandler(app, win);
  ipcEvents(app, win);

  setTimeout(() => updater(), 3000);
}

app.whenReady().then(createWindow);
app.setAsDefaultProtocolClient("analytic-wing-electron");
