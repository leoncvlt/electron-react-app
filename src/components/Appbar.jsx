import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { SettingsDialog } from "./SettingsDialog";

export const Appbar = () => {
  const goto = useHistory().push;
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Electron React App</Navbar.Heading>
        <Navbar.Divider />
        <Button minimal icon="database" text="Database" onClick={() => goto("/")} />
        <Button minimal icon="clean" text="About" onClick={() => goto("/about")} />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <SettingsDialog triggerComponent={Button} triggerProps={{ icon: "cog" }} />
      </Navbar.Group>
    </Navbar>
  );
};
