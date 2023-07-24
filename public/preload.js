const { contextBridge, ipcRenderer } = require("electron");

// helpers
const {
  GET_WEB_APP_INFO_SUCCESS,
  GET_WEB_APP_INFO, SAVE_FILE,
  UPDATE_PROGRESS_BAR,
  OPEN_FILE,
  OPEN_IN_BROWSER,
  FOCUS_MAIN_WINDOW,
  DOWNLOAD_EXTENSION,
  NAVIGATE_TO
} = require("./ipcEvents/ipcEventsKeys");

contextBridge.exposeInMainWorld("electronAPI", {
  getWebAppInfo: (payload) => ipcRenderer.send(GET_WEB_APP_INFO, payload),
  receiveWebAppInfo: (payload) => ipcRenderer.on(GET_WEB_APP_INFO_SUCCESS, payload),
  
  saveFile: (payload) => ipcRenderer.send(SAVE_FILE, payload),
  saveFileCallback: (payload) => ipcRenderer.on(SAVE_FILE, payload),

  updateProgressBar: (payload) => ipcRenderer.send(UPDATE_PROGRESS_BAR, payload),
  openFile: (payload) => ipcRenderer.send(OPEN_FILE, payload),
  openInBrowser: (payload) => ipcRenderer.send(OPEN_IN_BROWSER, payload),


  focusMainWindow: () => ipcRenderer.send(FOCUS_MAIN_WINDOW),
  navigateTo: (payload) => ipcRenderer.on(NAVIGATE_TO, payload),

  downloadExtension: (payload) => ipcRenderer.send(DOWNLOAD_EXTENSION, payload),
  downloadExtensionCallback: (payload) => ipcRenderer.on(DOWNLOAD_EXTENSION, payload)
});
