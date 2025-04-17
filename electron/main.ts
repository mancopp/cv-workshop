import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  // mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  mainWindow.loadURL('http://localhost:3000');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();
})