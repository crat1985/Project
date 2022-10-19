const {app,BrowserWindow,Menu,ipcMain, MenuItem} = require("electron")
const path = require("path");
const saveBookmarks = require("./modules/saveBookmarks");
const loadBookmarks = require("./modules/loadBookmarks")
const menuTemplate = require("./src/menuTemplate")
let menu = Menu.buildFromTemplate(menuTemplate);

const dataDir = path.join(__dirname,"data")
const bookmarksFile = path.join(__dirname,"data","bookmarks.data")
let bookmarks = loadBookmarks(dataDir,bookmarksFile)

Menu.setApplicationMenu(menu)

menu.getMenuItemById("bookmarks").submenu.append(new MenuItem({type:"separator"}))
menu.getMenuItemById("bookmarks").submenu.append(new MenuItem({label:"test"}))

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

    ipcMain.on("update-bookmarks",(event)=>{
        saveBookmarks(dataDir,bookmarks,bookmarksFile)
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
