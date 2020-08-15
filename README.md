# electron-react-app
A boilerplate for a react-based electron application, with local database support and fancy touches like dark / light theme and offline detection

The application is set up with:
- [Electron](https://www.electronjs.org/)
- [Create React App](https://github.com/facebook/create-react-app) for easy react bootstrapping
- React Router for internal page routing
- [Blueprint](https://blueprintjs.com/) as UI framework
- [React-JSS](https://cssinjs.org/react-jss) as styling solution
- [minim-json-db](https://www.npmjs.com/package/minim-json-db) for database integration

## Development
`npm run start` will start the a development server with hot reload, as well with an electron window pointing to the same server, so you can see the changes in real-time in the electron window.

`npm run build` will package the electron application using [electron-builder](https://www.electron.build/) as a stand-alone executable. `npm run dist` will do the same, but creating an installer instead.