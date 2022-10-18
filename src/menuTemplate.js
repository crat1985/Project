const {shell,BrowserWindow} = require("electron")
const path = require("path")
var canOpenWindow = true
module.exports = [
    {
        label: "Fichier",
        submenu: [
            {
                role: "close",
                id: "close",
                label: "Quitter"
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload',id:"reload", label:"Actualiser"},
            { role: 'forceReload', id:"forceReload", label:"Forcer l'actualisation"},
            { role: 'toggleDevTools', id:"devTools", label : "Afficher les outils développeurs"},
            { type: 'separator'},
            { role: 'resetZoom', id:"resetZoom", label:"Réinitialiser le zoom"},
            { role: 'zoomIn', id:"zoomIn", label:"Zoom +"},
            { role: 'zoomOut', id:"zoomOut", label:"Zoom -"},
            { type: 'separator'},
            { role: 'togglefullscreen', id:"fullScreen", label:"Plein écran"}
        ]
    },
    {
        label: "Favoris",
        submenu: [
            {
                label: "Ajouter cette page aux favoris",
                id: "addBookmark"
            }
        ]
    },
    {
        label: "Aide",
        submenu: [
            {
                label: "A propos",
                click: ()=>{
                    if(!canOpenWindow) return
                    canOpenWindow = false
                    const aboutWin = new BrowserWindow({
                        width: 300,
                        height: 300,
                        webPreferences: {
                            preload: path.join(__dirname,"aboutPreload.js"),
                            nodeIntegration: true,
                        },
                        resizable: false,
                        show: false,
                        movable: false,
                        alwaysOnTop: true
                    })
                    aboutWin.loadFile(path.join(__dirname,"about.html"))
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