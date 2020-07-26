const channels = {
  INSERT: "things.insert",
  FIND: "things.find",
  REMOVE: "things.remove",
  UPDATE: "things.update",
};

const collection = "things";

module.exports = {
  register: (window) => {
    const { ipcMain } = require("electron");
    const { create, insert, find, remove, update } = require("../electron/db");

    // create the database collection if it doesn't exists
    create(collection);

    ipcMain.handle(channels.INSERT, async (event, thing) => await insert(collection, thing));
    ipcMain.handle(channels.FIND, async (event, query) => await find(collection, query));
    ipcMain.handle(channels.REMOVE, async (event, query) => await remove(collection, query));
    ipcMain.handle(channels.UPDATE, async (event, query, set) => await update(collection, query, set));
  },

  insertThing: async (thing) => await window.ipcRenderer.invoke(channels.INSERT, thing),
  getAllThings: async (thing) => await window.ipcRenderer.invoke(channels.FIND, {}),
  deleteThingById: async (id) => await window.ipcRenderer.invoke(channels.REMOVE, { id }),
  updateThing: async (id, set) => await window.ipcRenderer.invoke(channels.UPDATE, { id }, set),
};
