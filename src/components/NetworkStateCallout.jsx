import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import { Callout, Intent } from "@blueprintjs/core";
import NetworkStateContext from "../context/NetworkStateContext";

const useStyles = createUseStyles({
  callout: {
    position: "absolute",
    borderRadius: 0,
    bottom: 0,
  },
});

export const NetworkStateCallout = () => {
  const classes = useStyles();
  const online = useContext(NetworkStateContext);

  return (
    !online && (
      <Callout intent={Intent.WARNING} className={classes.callout}>
        The application has no connectivity - offline functionality might be limited.
      </Callout>
    )
  );
};
