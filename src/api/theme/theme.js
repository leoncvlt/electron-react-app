const channels = require("./channels");

module.exports = {
  register: (window) => {
    const { ipcMain, nativeTheme } = require("electron");

    ipcMain.handle(channels.SET_THEME, (event, value) => {
      nativeTheme.themeSource = value;
      window.webContents.send(channels.THEME_UPDATED, nativeTheme.shouldUseDarkColors);
    });

    ipcMain.handle(channels.GET_THEME, () => nativeTheme.themeSource);
  },
};
