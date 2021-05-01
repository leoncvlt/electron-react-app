import channels from "./channels";

export async function catchPokemon(newPokemon) {
  return await window.api.invoke(channels.INSERT, newPokemon);
}
export async function getPokemons() {
  return await window.api.invoke(channels.FIND, {});
}
export async function getPokemonsWithNameContaining(string) {
  return await window.api.invoke(channels.FIND_WITH_NAME, string);
}
export async function setPokemonLevel(id, level) {
  return await window.api.invoke(channels.UPDATE, { id }, { level });
}
export async function freePokemon(id) {
  return await window.api.invoke(channels.REMOVE, { id });
}
