const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
      "minWidth": 500,
      "minHeight": 500
    })

    let reduxExtensionPath = '/Users/utopia/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0';
  
    BrowserWindow.addDevToolsExtension(reduxExtensionPath);
    // and load the index.html of the app.
    win.loadURL('http://localhost:3000/')
    win.maximize();

    if (process.env.NODE_ENV === 'development') {
      win.webContents.openDevTools()
    }

    win.on('closed', () => {
      win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
})