const {contextBridge, ipcRenderer} = require("electron")

window.addEventListener("DOMContentLoaded",(e)=>{
    ipcRenderer.on("update-url",(event,url)=>{
        console.log("test");
    })  
})
contextBridge.exposeInMainWorld("api",{
    sendUrl: (url,title) => ipcRenderer.send("url-changed",url,title),
    updateBookmarks: ()=> ipcRenderer.send("update-bookmarks"),
    onUpdatedURL: (url)=>ipcRenderer.on("update-url",(event,url)=>{
        document.getElementById("foo").src = url
    })
})