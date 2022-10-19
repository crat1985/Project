const {contextBridge, ipcRenderer} = require("electron")

window.addEventListener("DOMContentLoaded",(e)=>{
    console.log("slt");    
})
contextBridge.exposeInMainWorld("api",{
    sendUrl: (url,title) => ipcRenderer.send("url-changed",url,title),
    updateBookmarks: ()=> ipcRenderer.send("update-bookmarks"),
    updateURL: (url)=>ipcRenderer.on("update-url",(url)=>document.querySelector("webview").src = url)
})