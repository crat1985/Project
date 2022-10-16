const {app,BrowserWindow} = require("electron")
const path = require("path")

function createWindow(){
    const w = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname,"preload.js"),
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
    if (process.platform!=='darwin'){
        app.quit()
    }
})
