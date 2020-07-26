// Modules to control application life and create native browser window
const { ipcMain, nativeTheme } = require("electron");

module.exports = {
  register: (window) => {
    ipcMain.handle("nativeTheme.themeSource.set", (event, value) => {
      nativeTheme.themeSource = value;
      window.webContents.send("nativeTheme.updated", nativeTheme.shouldUseDarkColors);
    });

    ipcMain.handle("nativeTheme.themeSource.get", () => {
      return nativeTheme.themeSource;
    });
  },
};
