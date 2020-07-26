import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Appbar } from "../components/Appbar";
import { ShowcasePage } from "../pages/ShowcasePage";
import { useElectronTheme } from "../hooks/useElectronTheme";
import { DocumentsPage } from "../pages/DocumentsPage";

const AppContainer = styled.div`
  background-color: ${(props) => (props.className.includes("bp3-dark") ? "#30404d" : "#f5f8fa")};
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.div`
  padding: 1rem;
`;

function App() {
  const { getBlueprintTheme } = useElectronTheme();

  return (
    <Router>
      <AppContainer className={getBlueprintTheme()}>
        <Appbar />
        <InnerContainer>
          <Switch>
            <Route exact path="/" component={DocumentsPage}></Route>
            <Route exact path="/showcase" component={ShowcasePage}></Route>
          </Switch>
        </InnerContainer>
      </AppContainer>
    </Router>
  );
}

export default App;
