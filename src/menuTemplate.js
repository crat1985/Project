const {app,shell,BrowserWindow} = require("electron")
const path = require("path")
module.exports = [
    {
        label: "Fichier",
        submenu: [
            {
                label: "Quitter",
                click: app.quit
            }
        ]
    },
    {
        label: "Aide",
        submenu: [
            {
                label: "A propos",
                click: ()=>{
                    const aboutWin = new BrowserWindow({
                        width: 300,
                        height: 300
                    })
                    aboutWin.loadFile(path.join(__dirname,"about.html"))
                    aboutWin.show()
                    aboutWin.setMenu(null)
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