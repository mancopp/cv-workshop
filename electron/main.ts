import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'fs';
import { fileURLToPath } from 'url';

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
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
}

ipcMain.on('export-pdf', async (_event,) => {
  const win = new BrowserWindow({
    width: 700,
    height: 600,
    show: false,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  });

  // const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
  await win.loadURL(`${process.env.VITE_DEV_SERVER_URL}/generate-pdf`);

  // TODO: Is there a better way to do this?
  await win.webContents.executeJavaScript(`
    new Promise((resolve) => {
      const checkMounted = () => {
        if (window.__onMountedComplete) {
          resolve();
        } else {
          setTimeout(checkMounted, 50);
        }
      };
      checkMounted();
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