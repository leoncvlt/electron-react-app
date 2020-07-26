import React from "react";
import "./App.css";
import { Appbar } from "../components/Appbar";
import { ShowcasePage } from "../pages/ShowcasePage";
import { useElectronTheme } from "../hooks/useElectronTheme";
import { DocumentsPage } from "../pages/DocumentsPage";

function App() {
  const { getBlueprintTheme } = useElectronTheme();

  return (
    <div className={`app ${getBlueprintTheme()}`}>
      <Appbar />
      <div
        style={{
          padding: "1rem",
        }}
      >
        <DocumentsPage />
      </div>
    </div>
  );
}

export default App;
