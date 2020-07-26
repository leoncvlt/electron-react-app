const channels = {
  INSERT: "pokemon.insert",
  FIND: "pokemon.find",
  REMOVE: "pokemon.remove",
  UPDATE: "pokemon.update",

  FIND_WITH_NAME: "pokemon.findWithName",
};

const collection = "pokemon";

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

    ipcMain.handle(channels.FIND_WITH_NAME, async (event, name) => {
      const searchMethod = (pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase());
      return await find(collection, searchMethod);
    });
  },

  catchPokemon: async (pokemon) => await window.ipcRenderer.invoke(channels.INSERT, pokemon),
  getPokemons: async () => await window.ipcRenderer.invoke(channels.FIND, {}),
  getPokemonsWithNameContaining: async (string) => await window.ipcRenderer.invoke(channels.FIND_WITH_NAME, string),
  setPokemonLevel: async (id, level) => await window.ipcRenderer.invoke(channels.UPDATE, { id }, { level }),
  freePokemon: async (id) => await window.ipcRenderer.invoke(channels.REMOVE, { id }),
};
