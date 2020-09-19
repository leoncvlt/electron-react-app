import React, { useState } from "react";
import { Button } from "@blueprintjs/core";

export const AboutPage = () => (
  <>
    <h1 id="electron-react-app">electron-react-app</h1>
    <p>
      A boilerplate for a react-based electron desktop application, with local database support and
      fancy touches like dark / light theme and offline detection.
    </p>
    <p>The application is set up with:</p>
    <ul>
      <li>
        <a href="https://www.electronjs.org/" target="_blank">Electron</a>
      </li>
      <li>
        <a href="https://github.com/facebook/create-react-app" target="_blank">Create React App</a> for easy react
        bootstrapping
      </li>
      <li>
        <a href="https://reactrouter.com/" target="_blank">React Router</a> for internal page routing
      </li>
      <li>
        <a href="https://blueprintjs.com/" target="_blank">Blueprint</a> as UI framework
      </li>
      <li>
        <a href="https://cssinjs.org/react-jss" target="_blank">React-JSS</a> as styling solution
      </li>
      <li>
        <a href="https://www.npmjs.com/package/minim-json-db" target="_blank">minim-json-db</a> for database
        integration
      </li>
    </ul>
    <h2 id="development">Development</h2>
    <p>
      <code>npm run start</code> will start the a development server with hot reload, as well with
      an electron window pointing to the same server, so you can see the changes in real-time in the
      electron window.
    </p>
    <p>
      <code>npm run build</code> will package the electron application using{" "}
      <a href="https://www.electron.build/">electron-builder</a> as a stand-alone executable.{" "}
    </p>
    <p>
      <code>npm run dist</code> will package the application as well, but creating an installer
      instead.
    </p>
  </>
);
