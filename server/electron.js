/* eslint-disable init-declarations */
const { app } = require("electron");
require("dotenv").config();

// utils
const MainWindow = require("./utils/MainWindow");

// helpers
const appEventsHandler = require("./helpers/appEventsHandler");
const ipcEvents = require("./ipcEvents");

const isDev = process.env.NODE_ENV === "development";
let win;

async function createWindow() {
  win = new MainWindow(isDev);
  await win.initialize();

  appEventsHandler(app, win);
  ipcEvents(app, win);
}

app.whenReady().then(createWindow);
app.setAsDefaultProtocolClient("analytic-wing-electron");
