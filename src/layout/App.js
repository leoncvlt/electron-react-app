import React from "react";
import { createUseStyles } from "react-jss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Appbar } from "../components/Appbar";
import { useElectronTheme } from "../hooks/useElectronTheme";
import { PokemonPage } from "../pages/PokemonPage";
import { AboutPage } from "../pages/AboutPage";
import { NetworkStateContextProvider } from "../context/NetworkStateContext";
import { NetworkStateCallout } from "../components/NetworkStateCallout";

const useStyles = createUseStyles({
  app: {
    backgroundColor: "#f5f8fa",
    minHeight: "100vh",
    "&.bp3-dark": {
      backgroundColor: "#30404d",
    },
  },
  container: {
    padding: "1rem",
  },
});

function App() {
  const classes = useStyles();
  const { getBlueprintTheme } = useElectronTheme();

  return (
    <Router>
      <NetworkStateContextProvider>
        <div className={`${classes.app} ${getBlueprintTheme()}`}>
          <Appbar />
          <div className={classes.container}>
            <Switch>
              <Route exact path="/" component={PokemonPage}></Route>
              <Route exact path="/about" component={AboutPage}></Route>
            </Switch>
          </div>
          <NetworkStateCallout />
        </div>
      </NetworkStateContextProvider>
    </Router>
  );
}

export default App;
