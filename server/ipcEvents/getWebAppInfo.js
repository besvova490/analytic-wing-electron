/* eslint-disable init-declarations */
const { BrowserWindow } = require("electron");

let offscreenWindow;

module.exports = (data, callback) => {
  offscreenWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    show: false,
    webPreferences: { offscreen: true, },
  });

  offscreenWindow.loadURL(data.url);

  offscreenWindow.webContents.on("did-finish-load", () => {
    offscreenWindow.webContents.capturePage().then((image) => {
      const screenshot = image.toDataURL();

      callback({
        ...data,
        screenshot,
        metaTitle: offscreenWindow.getTitle(),
      });

      offscreenWindow.close();
      offscreenWindow = null;
    });
  });
};
