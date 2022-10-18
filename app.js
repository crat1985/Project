const {app,BrowserWindow,Menu,ipcMain} = require("electron")
const path = require("path")
const menuTemplate = require("./src/menuTemplate")

const menu = Menu.buildFromTemplate(menuTemplate)

Menu.setApplicationMenu(menu)

let currentURL
function createWindow(){
    const w = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname,"preload.js"),
            nodeIntegration: true,
            webviewTag: true
        },
        show: false
    })

    w.loadFile("index.html")
    w.once("ready-to-show",w.show)
}

app.whenReady().then(()=>{
    createWindow()

    ipcMain.on("url-changed",(event,url)=>{
        currentURL = url
    })

    app.on("activate",()=>{
        if (BrowserWindow.getAllWindows().length===0){
            createWindow()
        }
    })
})

app.on("window-all-closed",()=>{
    if (process.platform!=='darwin') app.quit()
})
