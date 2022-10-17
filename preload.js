const {contextBridge, ipcRenderer} = require("electron")

window.addEventListener("DOMContentLoaded",(e)=>{
    console.log("slt");    
})
contextBridge.exposeInMainWorld("api",{
    sendUrl: (url) => ipcRenderer.send("url-changed",url)
})