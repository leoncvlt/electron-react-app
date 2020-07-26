import React from "react";
import { Button, Navbar, Alignment, Dialog } from "@blueprintjs/core";
import { SettingsDialog } from "./SettingsDialog";

export const Appbar = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Electron React App</Navbar.Heading>
        <Navbar.Divider />
        <Button minimal icon="home" text="Home" />
        <Button minimal icon="document" text="Files" />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <SettingsDialog triggerComponent={Button} triggerProps={{ icon: "cog" }}></SettingsDialog>
      </Navbar.Group>
      <Dialog></Dialog>
    </Navbar>
  );
};
