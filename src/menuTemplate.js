const {app,shell,BrowserWindow} = require("electron")
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
        label: "Aide",
        submenu: [
            {
                label: "A propos",
                click: ()=>{
                    if (!canOpenWindow) return
                    canOpenWindow = false
                    const aboutWin = new BrowserWindow({
                        width: 300,
                        height: 300
                    })
                    aboutWin.loadFile(path.join(__dirname,"about.html"))
                    aboutWin.show()
                    aboutWin.setMenu(null)
                    aboutWin.on("closed",()=>{
                        canOpenWindow = true
                    })
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