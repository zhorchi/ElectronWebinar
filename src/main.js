const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow

function createWindow(){
    const window = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        }
    )
    
    window.loadFile("src/renderer/index.html")
}

app.whenReady().then(createWindow)