const {shell} = require("electron")

window.addEventListener("DOMContentLoaded",()=>{
    document.querySelector("button").addEventListener("click",e=>{
        window.close()
    })
    document.querySelector(".maeldevfr").addEventListener("click",e=>{
        shell.openExternal("https://github.com/MaelDevFr/")
    })
    document.querySelector(".ric217").addEventListener("click",e=>{
        shell.openExternal("https://github.com/RIC217/")
    })
})