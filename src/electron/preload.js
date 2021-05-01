const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },

  off: (channel, callback) => {
    ipcRenderer.off(channel, callback);
  },

  invoke: async (channel, ...params) => {
    return await ipcRenderer.invoke(channel, ...params);
  },
});
