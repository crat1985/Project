const {app,BrowserWindow,Menu,ipcMain} = require("electron")
const path = require("path")
const menuTemplate = require("./src/menuTemplate")
const fs = require("fs")

const menu = Menu.buildFromTemplate(menuTemplate)

const dataDir = path.join(__dirname,"data")
const bookmarksFile = path.join(__dirname,"data","bookmarks.data")

if(!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir)
}

if(!fs.existsSync(bookmarksFile)){
    fs.writeFileSync(bookmarksFile,"")
}

let bookmarksFileContent = fs.readFileSync(bookmarksFile).toString()
let bookmarks = []
if(bookmarksFileContent.length > 0){
    bookmarksFileContent.split("\n").forEach((bookmark,i,array)=>{
        if(i==0 && bookmark.length>0){
            bookmarks.push({url : bookmark, title: array[i+1]})
        } else if(i%2==0 && bookmark.length>0){
            bookmarks.push({url : bookmark, title: array[i+1]})
        }
    })
}


Menu.setApplicationMenu(menu)
// Menu.getApplicationMenu().getMenuItemById("addBookmark").label;

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
