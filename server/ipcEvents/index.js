const { ipcMain, shell } = require("electron");

// helpers
const getWebAppInfo = require("./getWebAppInfo");
const saveFile = require("./saveFile");
const {
  GET_WEB_APP_INFO,
  GET_WEB_APP_INFO_SUCCESS,
  UPDATE_PROGRESS_BAR,
  SAVE_FILE,
  OPEN_FILE,
  OPEN_IN_BROWSER
} = require("./ipcEventsKeys");

module.exports = (app, win) => {
  ipcMain.on(
    GET_WEB_APP_INFO,
    (_, url) => getWebAppInfo(url, payload => win.webContents.send(GET_WEB_APP_INFO_SUCCESS, payload))
  );

  ipcMain.on(
    UPDATE_PROGRESS_BAR,
    (_, progress) => win.setProgressBar(progress)
  );

  ipcMain.on(
    SAVE_FILE,
    (_, data) => saveFile(data, app, (payload) => win.webContents.send(SAVE_FILE, payload))
  );

  ipcMain.on(
    OPEN_FILE,
    (_, filepath) => shell.showItemInFolder(filepath)
  );

  ipcMain.on(
    OPEN_IN_BROWSER,
    (_, url) => shell.openExternal(url)
  );
};
