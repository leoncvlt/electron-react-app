const channels = {
  INSERT: "pokemon.insert",
  FIND: "pokemon.find",
  REMOVE: "pokemon.remove",
  UPDATE: "pokemon.update",

  FIND_WITH_NAME: "pokemon.findWithName",
};

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

  catchPokemon: async (newPokemon) => await window.ipcRenderer.invoke(channels.INSERT, newPokemon),
  getPokemons: async () => await window.ipcRenderer.invoke(channels.FIND, {}),
  getPokemonsWithNameContaining: async (string) =>
    await window.ipcRenderer.invoke(channels.FIND_WITH_NAME, string),
  setPokemonLevel: async (id, level) =>
    await window.ipcRenderer.invoke(channels.UPDATE, { id }, { level }),
  freePokemon: async (id) => await window.ipcRenderer.invoke(channels.REMOVE, { id }),
};
