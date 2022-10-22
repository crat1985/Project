const {app,BrowserWindow,Menu,ipcMain,dialog, ipcRenderer} = require("electron")
const path = require("path");
const getHumanDate = require("./modules/getHumanDate");
const saveBookmarks = require("./modules/saveBookmarks");
const saveHistory = require("./modules/saveHistory");
const dataDir = path.join(__dirname,"data")
const bookmarksFile = path.join(__dirname,"data","bookmarks.data")
const historyFile = path.join(__dirname,"data","history.data")
let bookmarks = require("./modules/loadBookmarks")(dataDir,bookmarksFile)
let history = require("./modules/loadHistory")(historyFile)
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
        alwaysOnTop: true,
        frame: false
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
            dialog.showMessageBox(w,{title: "Favori déjà existant",message: "Le favoris n'a pas été ajouté car il fait déjà partie de votre liste de favoris."})
            return
        }
    })
    if(!alreadyExist){
        let URLTemp = currentURL
        bookmarks.push({url:URLTemp,title:currentTitle})
        dialog.showMessageBox(w,{title:"Favori ajouté",message:"Le site "+URLTemp+" a bien été ajouté à votre liste de favoris."})
    }
    saveBookmarks(dataDir,bookmarks,bookmarksFile)
    buildMenu()
}
const deleteHistory = ()=>{
    dialog.showMessageBox(w,{title:"Confirmer", message:"Souhaitez-vous vraiment effacer l'historique ?",type:"question",buttons:["Annuler","Confirmer"],defaultId:0,cancelId:0}).then((value)=>{
        if(value.response===1){
            history = []
            saveHistory(dataDir,history,historyFile)
            buildMenu()
            dialog.showMessageBox(w,{title:"Historique effacé",message:"L'historique a été effacé avec succès !"})
        }
    })
}
const buildMenu = ()=>{
    return require("./src/menuTemplate")(addBookmarkFunc,aboutFunc,openURL,bookmarks,history,deleteHistory)
}

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
        let date = Date.now()
        history.push({url:url,title:title,date:getHumanDate(new Date(date)),dateUnix:date})
        require("./modules/saveHistory")(dataDir,history,path.join(__dirname,"data","history.data"))
        buildMenu()
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
