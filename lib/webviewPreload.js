const { ipcRenderer } = require('electron');

window.sendToHost = function() {
  ipcRenderer.sendToHost.apply(ipcRenderer, arguments);
}
