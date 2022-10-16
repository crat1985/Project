const {app,BrowserWindow,Menu} = require("electron")
const path = require("path")
const menuTemplate = require("./src/menuTemplate")

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)
function createWindow(){
    const w = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname,"preload.js"),
            nodeIntegration: true,
            webviewTag: true
        }
    })

    w.loadFile("index.html")
}

app.whenReady().then(()=>{
    createWindow()

    app.on("activate",()=>{
        if (BrowserWindow.getAllWindows.length===0){
            createWindow()
        }
    })
})

app.on("window-all-closed",()=>{
    if (process.platform!=='darwin') app.quit()
})
