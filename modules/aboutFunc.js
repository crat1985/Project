const { BrowserWindow } = require("electron")
const path = require("path")
let canOpenAboutWindow = true
module.exports = ()=>{
    if(!canOpenAboutWindow) return
    canOpenAboutWindow = false
    const aboutWin = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname,"..","src","aboutPreload.js"),
            nodeIntegration: true,
        },
        resizable: false,
        show: false,
        movable: false,
        alwaysOnTop: true,
        frame: false
    })
    aboutWin.loadFile(path.join(__dirname,"..","src","about.html"))
    aboutWin.setMenu(null)
    aboutWin.on("closed",()=>{
        canOpenAboutWindow = true
    })
    aboutWin.once("ready-to-show",aboutWin.show)
}