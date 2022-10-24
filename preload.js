const {contextBridge, ipcRenderer} = require("electron")

window.addEventListener("DOMContentLoaded",(e)=>{
    contextBridge.exposeInMainWorld("api",{
        sendUrlToMain: (url,title) => ipcRenderer.send("send-url-to-main",url,title),
        updateRendererURL: (url) => ipcRenderer.on("update-url",url)
    })
})
