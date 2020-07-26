import { useState, useEffect } from "react";

export const useElectronTheme = () => {
  const getElectronTheme = async () => {
    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme ? savedTheme : await window.ipcRenderer.invoke("nativeTheme.themeSource.get");
  };
  const setElectronTheme = (theme) => {
    window.ipcRenderer.invoke("nativeTheme.themeSource.set", theme);
    window.localStorage.setItem("theme", theme);
    _setNativeTheme(theme);
  };

  const [nativeTheme, _setNativeTheme] = useState("")
  const [darkMode, setDarkMode] = useState();

  const onThemeChanged = (event, shoudlUseDarkMode) => {
    setDarkMode(shoudlUseDarkMode);
  };

  useEffect(() => {
    window.ipcRenderer.on("nativeTheme.updated", onThemeChanged);

    const refreshNativeTheme = async () => {
      const theme = await getElectronTheme();
      setElectronTheme(theme);
    };
    refreshNativeTheme();

    return () => window.ipcRenderer.off("nativeTheme.updated", onThemeChanged);
  }, []);

  const getBlueprintTheme = () => (darkMode ? "bp3-dark" : "");

  return { getBlueprintTheme, nativeTheme, setElectronTheme };
};
