const {app,BrowserWindow,Menu,ipcMain, MenuItem} = require("electron")
const path = require("path");
const saveBookmarks = require("./modules/saveBookmarks");
const loadBookmarks = require("./modules/loadBookmarks")
const dataDir = path.join(__dirname,"data")
const bookmarksFile = path.join(__dirname,"data","bookmarks.data")
let bookmarks = loadBookmarks(dataDir,bookmarksFile)
let currentURL
let currentTitle
let canOpenAboutWindow = true
const aboutFunc = ()=>{
    if(!canOpenAboutWindow) return
    canOpenAboutWindow = false
    const aboutWin = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname,"src","aboutPreload.js"),
            nodeIntegration: true,
        },
        resizable: false,
        show: false,
        movable: false,
        alwaysOnTop: true
    })
    aboutWin.loadFile(path.join(__dirname,"src","about.html"))
    aboutWin.setMenu(null)
    aboutWin.on("closed",()=>{
        canOpenAboutWindow = true
    })
    aboutWin.once("ready-to-show",aboutWin.show)
}
let w
const openURL = (url)=>{
    w.webContents.send('update-url', url)
}
const addBookmarkFunc = ()=>{
    let alreadyExist = false
    bookmarks.forEach(bookmark=>{
        if(bookmark.url==currentURL){
            alreadyExist = true
            return
        }
    })
    if(!alreadyExist) bookmarks.push({url:currentURL,title:currentTitle})
    console.log(bookmarks);
    saveBookmarks(dataDir,bookmarks,bookmarksFile)
    require("./src/menuTemplate")(addBookmarkFunc,aboutFunc,openURL,bookmarks)
}
let menuTemplate = require("./src/menuTemplate")(addBookmarkFunc,aboutFunc,openURL,bookmarks)
let menu = Menu.buildFromTemplate(menuTemplate);

Menu.setApplicationMenu(menu)

function createWindow(){
    w = new BrowserWindow({
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

    ipcMain.on("url-changed",(event,url,title)=>{
        currentURL = url
        currentTitle = title
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
