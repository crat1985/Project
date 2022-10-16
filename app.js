const {app,BrowserWindow} = require("electron")
const path = require("path")
const https = require("https")

function createWindow(){
    const w = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname,"preload.js")
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

let engine = "duckduckgo"
let search = "vscode"
let lang = "fr-fr"
https.get("https://serpapi.com/search.json?engine="+engine+"&q="+search+"&kl="+lang,function(res){
    let data = ""

    res.on("data",buff=>{
        data+=buff
    })

    res.on("end",()=>{
        console.log(JSON.parse(data));
    })
})
