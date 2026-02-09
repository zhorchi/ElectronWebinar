const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'database.txt')

function createWindow(){
    const window = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, "preload.js")
            }
        }
    )
    
    window.loadFile("src/renderer/index.html")
}

ipcMain.handle('save-task', (event, taskName, taskText) =>{
    const dataToSave = `${taskName} | ${taskText}\n`
    fs.appendFileSync(dbPath, dataToSave)
    return { success: true }
})

ipcMain.handle('load-tasks', () => {
    if (fs.existsSync(dbPath)){
            const fileContent = fs.readFileSync(dbPath, 'utf-8')
            const rows = fileContent.split('\n')
            return rows
        }
    return []
})

app.whenReady().then(createWindow)