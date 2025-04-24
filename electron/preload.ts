const { contextBridge, ipcRenderer } = require('electron');

/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

console.log('Preload script loaded');

contextBridge.exposeInMainWorld('electronAPI', {
  exportPDF: () => ipcRenderer.send('export-pdf'),
  importHtml: () => ipcRenderer.send('import-html'),
});
