const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
autoUpdater.autoDownload = false;

module.exports = () => {
  autoUpdater.checkForUpdates();

  autoUpdater.on("update-available", () => {
    dialog.showMessageBox({
      type: "info",
      title: "Update available",
      message: "A new version is available. Do you want to update now?",
      buttons: ["Update", "No"],
    }).then((result) => {
      const buttonIndex = result.response;
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog.showMessageBox({
      type: "info",
      title: "Update ready",
      message: "Install and restart now?",
      buttons: ["Yes", "Later"],
    }).then((result) => {
      const buttonIndex = result.response;
      if (buttonIndex === 0) {
        autoUpdater.quitAndInstall(false, true);
      }
    });
  });
};
