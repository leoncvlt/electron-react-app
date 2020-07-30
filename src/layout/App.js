import React from "react";
import { createUseStyles } from "react-jss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Appbar } from "../components/Appbar";
import { ShowcasePage } from "../pages/ShowcasePage";
import { useElectronTheme } from "../hooks/useElectronTheme";
import { PokemonPage } from "../pages/PokemonPage";

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
  console.log(classes);
  const { getBlueprintTheme } = useElectronTheme();

  return (
    <Router>
      <div className={`${classes.app} ${getBlueprintTheme()}`}>
        <Appbar />
        <div className={classes.container}>
          <Switch>
            <Route exact path="/" component={PokemonPage}></Route>
            <Route exact path="/showcase" component={ShowcasePage}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
