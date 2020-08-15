import channels from "./channels";

export async function catchPokemon(newPokemon) {
  return await window.ipcRenderer.invoke(channels.INSERT, newPokemon);
}
export async function getPokemons() {
  return await window.ipcRenderer.invoke(channels.FIND, {});
}
export async function getPokemonsWithNameContaining(string) {
  return await window.ipcRenderer.invoke(channels.FIND_WITH_NAME, string);
}
export async function setPokemonLevel(id, level) {
  return await window.ipcRenderer.invoke(channels.UPDATE, { id }, { level });
}
export async function freePokemon(id) {
  return await window.ipcRenderer.invoke(channels.REMOVE, { id });
}
