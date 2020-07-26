const channels = {
  GET_THEME: "nativeTheme.themeSource.get",
  SET_THEME: "nativeTheme.themeSource.set",
  THEME_UPDATED: "nativeTheme.updated",
};

module.exports = {
  register: (window) => {
    const { ipcMain, nativeTheme } = require("electron");
    ipcMain.handle(channels.SET_THEME, (event, value) => {
      nativeTheme.themeSource = value;
      window.webContents.send("nativeTheme.updated", nativeTheme.shouldUseDarkColors);
    });

    ipcMain.handle(channels.GET_THEME, () => nativeTheme.themeSource);
  },

  getNativeTheme: async () => await window.ipcRenderer.invoke(channels.GET_THEME),
  setNativeTheme: async (theme) => await window.ipcRenderer.invoke(channels.SET_THEME, theme),
  addThemeChangeListener: (listener) => window.ipcRenderer.on(channels.THEME_UPDATED, listener),
  removeThemeChangeListener: (listener) => window.ipcRenderer.off(channels.THEME_UPDATED, listener),
};
