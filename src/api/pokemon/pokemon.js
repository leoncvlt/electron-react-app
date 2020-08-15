const channels = require("./channels");

module.exports = {
  register: (window) => {
    const db = require("minim-json-db");
    const { ipcMain } = require("electron");

    const pokemon = db.collection("pokemon");

    ipcMain.handle(channels.INSERT, async (event, newPokemon) => await pokemon.insert(newPokemon));
    ipcMain.handle(channels.FIND, async (event, query) => await pokemon.find(query));
    ipcMain.handle(channels.REMOVE, async (event, query) => await pokemon.delete(query));
    ipcMain.handle(channels.UPDATE, async (event, query, set) => await pokemon.update(query, set));

    ipcMain.handle(channels.FIND_WITH_NAME, async (event, name) => {
      const searchMethod = (pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase());
      return await pokemon.find(searchMethod);
    });
  },
};
