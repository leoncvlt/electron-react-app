import channels from "./channels";

export async function getNativeTheme() {
  return await window.api.invoke(channels.GET_THEME);
}
export async function setNativeTheme(theme) {
  return await window.api.invoke(channels.SET_THEME, theme);
}
export function addThemeChangeListener(listener) {
  return window.api.on(channels.THEME_UPDATED, listener);
}
export function removeThemeChangeListener(listener) {
  return window.api.off(channels.THEME_UPDATED, listener);
}
