"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var persistence_context_1 = require("./persistence/persistence-context");
var path = require('path');
var url = require('url');
var sqlite = require('sqlite3');
// enableLiveReload();
require('electron-reload')(path.join(__dirname, "/../../dist"));
var win;
function createWindow() {
    new persistence_context_1.PersistenceContext(electron_1.ipcMain).init()
        .then(function () { return console.log('Persistence context is OK!'); });
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 670,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        },
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/StoreApp/index.html"),
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
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On macOS specific close cart-manage
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // macOS specific close cart-manage
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map