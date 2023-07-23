const { BrowserWindow } = require("electron");
const path = require("path");

class MainWindow extends BrowserWindow {
  constructor(isDev, config = {}) {
    super({
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "../preload.js")
      },
      ...config,
    });

    this.isDev = isDev;
  }

  async initialize() {
    await this.loadURL(
      this.isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../index.html")}`
    );

    this.once("ready-to-show", () => {
      this.show();
    });

    if (this.isDev) {
      this.webContents.openDevTools();
    }
  }
}


module.exports = MainWindow;
