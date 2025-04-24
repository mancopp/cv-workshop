import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { serveFile } from './htmlFileServer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Main process loaded');
console.log(path.join(__dirname, 'preload.js'));

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // FIXME: Verify the ability to get rid of iframe cors problems without setting this
      webSecurity: false,
    }
  });

  mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
}

ipcMain.on('import-html', async () => {
  const file = await dialog.showOpenDialog({ filters: [{name: 'HTML Files', extensions: ['html']}], properties: ['openFile']});
  console.log(file);

  if(file.filePaths.length !== 1) return;

  fs.readFile(file.filePaths[0], function (err, html) {
    if (err) {
      throw err; 
    }
    serveFile(html);
  });
})

ipcMain.on('export-pdf', async (_event) => {
  const win = new BrowserWindow({
    width: 700,
    height: 600,
    show: false,
    webPreferences: {
      // FIXME: Verify the ability to get rid of iframe cors problems without setting this
      webSecurity: false,
    }
  });

  await win.loadURL(`${process.env.VITE_DEV_SERVER_URL}/generate-pdf`);

  // TODO: Is there a better way to do this?
  await win.webContents.executeJavaScript(`
    new Promise((resolve) => {
      const checkReadyToExport = () => {
        if (window.__readyToExport) {
          resolve();
        } else {
          setTimeout(checkReadyToExport, 50);
        }
      };
      checkReadyToExport();
    });
  `);

  const pdfPath = path.join(app.getPath('desktop'), 'exported.pdf');
  const pdfData = await win.webContents.printToPDF({ pageSize: 'A4', printBackground: true, margins: { top: 0, bottom: 0, left: 0, right: 0 } });

  fs.writeFile(pdfPath, pdfData, (err) => {
    if (err) {
      console.error('Failed to save PDF:', err);
    } else {
      console.log('PDF saved to:', pdfPath);
    }
  });

  win.close();
});

app.whenReady().then(() => {
  createWindow();
})