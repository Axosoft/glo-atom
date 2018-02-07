const { ipcRenderer } = require('electron');

window.HostIPC = {
  version: '0.0.1',
  name: 'Atom',
  sendToHost: (...args) => ipcRenderer.sendToHost(...args),
  on: (...args) => ipcRenderer.on(...args),
  once: (...args) => ipcRenderer.once(...args)
};
