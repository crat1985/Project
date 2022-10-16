const {app,shell} = require("electron")
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
                label: "A propos"
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