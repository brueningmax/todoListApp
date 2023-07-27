const { contextBridge, ipcRenderer, app } = require('electron');

// Expose a subset of electron APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // Expose methods and properties that you need in the renderer process
  closeApp: () => ipcRenderer.invoke('close-app', 'close'),
});