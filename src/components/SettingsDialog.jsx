import React, { useState, useEffect } from "react";
import { Dialog, Classes, RadioGroup, Radio } from "@blueprintjs/core";
import { useElectronTheme } from "../hooks/useElectronTheme";

export const SettingsDialog = ({ triggerComponent, triggerProps }) => {
  const { getBlueprintTheme, nativeTheme, setElectronTheme } = useElectronTheme();

  const [isOpen, setOpen] = useState(false);
  // const [themeSetting, setThemeSetting] = useState("system");

  // useEffect(() => {
  //   const getTheme = async () => {
  //     const theme = await getElectronTheme();
  //     setThemeSetting(theme);
  //     setElectronTheme(theme);
  //   };
  //   getTheme();
  // }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleThemeChange = (event) => {
    const value = event.target.value;
    setElectronTheme(value);
  };

  const Trigger = triggerComponent;
  return (
    <>
      <Trigger {...triggerProps} onClick={handleOpen}></Trigger>
      <Dialog title="Settings" onClose={handleClose} isOpen={isOpen} className={`${getBlueprintTheme()}`}>
        <div className={Classes.DIALOG_BODY}>
          <RadioGroup label="Theme" onChange={handleThemeChange} selectedValue={nativeTheme}>
            <Radio label="System" value="system" />
            <Radio label="Light" value="light" />
            <Radio label="Dark" value="dark" />
          </RadioGroup>
        </div>
      </Dialog>
    </>
  );
};
