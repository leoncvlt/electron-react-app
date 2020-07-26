import { useState, useEffect } from "react";
import { getNativeTheme, setNativeTheme, addThemeChangeListener, removeThemeChangeListener } from "../api/theme";

export const useElectronTheme = () => {
  const getElectronTheme = async () => {
    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme ? savedTheme : await getNativeTheme();
  };
  const setElectronTheme = (theme) => {
    setNativeTheme(theme);
    window.localStorage.setItem("theme", theme);
    _setNativeTheme(theme);
  };

  const [nativeTheme, _setNativeTheme] = useState("");
  const [darkMode, setDarkMode] = useState();

  const onThemeChanged = (event, shoudlUseDarkMode) => {
    setDarkMode(shoudlUseDarkMode);
  };

  useEffect(() => {
    addThemeChangeListener(onThemeChanged);

    getElectronTheme().then((theme) => {
      setElectronTheme(theme);
    });

    return () => removeThemeChangeListener(onThemeChanged);
  }, []);

  const getBlueprintTheme = () => (darkMode ? "bp3-dark" : "");

  return { getBlueprintTheme, nativeTheme, setElectronTheme };
};
