const {contextBridge, ipcRenderer} = require("electron")

window.addEventListener("DOMContentLoaded",(e)=>{
    ipcRenderer.on("update-url",(event,url)=>{
        document.getElementById("foo").src = url
        console.log(document.getElementById("foo").src);
    })
    contextBridge.exposeInMainWorld("api",{
        sendUrl: (url,title) => ipcRenderer.send("url-changed",url,title),
        updateBookmarks: ()=> ipcRenderer.send("update-bookmarks"),
    })
})
