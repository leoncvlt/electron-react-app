import channels from "./channels";

export async function getNativeTheme() {
  return await window.ipcRenderer.invoke(channels.GET_THEME);
}
export async function setNativeTheme(theme) {
  return await window.ipcRenderer.invoke(channels.SET_THEME, theme);
}
export function addThemeChangeListener(listener) {
  return window.ipcRenderer.on(channels.THEME_UPDATED, listener);
}
export function removeThemeChangeListener(listener) {
  return window.ipcRenderer.off(channels.THEME_UPDATED, listener);
}
