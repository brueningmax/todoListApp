const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

// const isDev = require('electron-is-dev');


let mainWindow;

async function checkBackend() {
    try {
        const fetch = require("electron-fetch").default
        const request = await fetch('http://localhost:9876/')
        console.log('Server is running: ', request.status === 200)
    } catch (err) {
        if (err.type = 'system') {
            const { shell } = require('electron');
            let scriptPath = app.getAppPath()
            scriptPath = scriptPath.replace(/\\/g, '/').replace(/\/frontend$/, '/backend/scripts/startup.vbs');
            shell.openExternal(scriptPath);
        } else {
            console.log(err)
        }
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true // enable Node.js integration in the renderer process
        }
    });

    // Load your React app's index.html file
    mainWindow.loadURL(
        // isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`
        `file://${path.join(__dirname, '../dist/index.html')}`
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });



    Menu.setApplicationMenu(null);
    mainWindow.webContents.openDevTools();
}

app.on('ready', () => {

    checkBackend()
    setInterval(checkBackend, 3 * 60 * 1000)

    // Handle close-window IPC message
    ipcMain.handle('close-window', () => {
        app.quit();
    })
    createWindow()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});