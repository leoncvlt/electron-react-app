// makes the electron ipc event emitter available on the render process
const { ipcRenderer } = require('electron')
window.ipcRenderer = ipcRenderer;