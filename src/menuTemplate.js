const {shell,BrowserWindow} = require("electron")
const path = require("path")
var canOpenWindow = true
module.exports = [
    {
        label: "Fichier",
        submenu: [
            {
                role: "close"
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        label: "Aide",
        submenu: [
            {
                label: "A propos",
                click: ()=>{
                    if (!canOpenWindow) return
                    canOpenWindow = false
                    const aboutWin = new BrowserWindow({
                        width: 300,
                        height: 300,
                        webPreferences: {
                            preload: path.join(__dirname,"about.js")
                        },
                        resizable: false,
                        show: false,
                        movable: false
                    })
                    aboutWin.loadFile(path.join(__dirname,"about.html"))
                    aboutWin.show()
                    aboutWin.setMenu(null)
                    aboutWin.on("closed",()=>{
                        canOpenWindow = true
                    })
                    aboutWin.once("ready-to-show",aboutWin.show)
                }
            },
            {
                type: "separator"
            },
            {
                label: "Plus d'infomations",
                click: ()=>{
                    shell.openExternal("https://github.com/MaelDevFr/Project")
                }
            }
        ]
    }
]