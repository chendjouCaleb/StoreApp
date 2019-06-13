import {app, BrowserWindow, ipcMain} from 'electron';
import {enableLiveReload} from 'electron-compile';
import {createConnection} from 'typeorm';
import {Article} from './models/article';
import {PersistenceContext} from './persistence/persistence-context';

const path = require('path');
const url = require('url');
const sqlite = require('sqlite3');

// enableLiveReload();
require('electron-reload')(path.join(__dirname, `/../../dist`));


let win: BrowserWindow;

function createWindow() {

  new PersistenceContext(ipcMain).init()
    .then(() => console.log('Persistence context is OK!'));

  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 670,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    },
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, `/../../dist/StoreApp/index.html`),
    protocol: 'file:',
    slashes: true
  }));


  // uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null;
  });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close cart-manage
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS specific close cart-manage
  if (win === null) {
    createWindow();
  }
});
