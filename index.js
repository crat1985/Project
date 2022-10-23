window.addEventListener("DOMContentLoaded",()=>{
    const webview = document.querySelector("webview")
    const urlBar = document.querySelector("input[type=text]")
    const homePage = webview.src
    webview.addEventListener("dom-ready",()=>{
        let url = webview.getURL()
        let title = webview.getTitle()
        if(url===homePage){
            url = "navigator://new-tab"
        }
        window.api.sendUrl(url,title)
        if(webview.getURL()===homePage){
            urlBar.value = "navigator://new-tab"
        } else {
            urlBar.value = webview.src
        }
        webview.addEventListener("did-start-loading",()=>{
            window.api.sendUrl(webview.getURL(),webview.getTitle())
            if(webview.getURL()===homePage){
                urlBar.value = "navigator://new-tab"
            } else {
                urlBar.value = webview.src
            }
        })
    })
    window.api.updateURL((event,url)=>{
        if(url==="navigator://new-tab"){
            webview.src = homePage
            urlBar.value = "navigator://new-tab"
        } else{
            webview.src = url
            urlBar.value = webview.src
        }
    })
    urlBar.value = webview.src
    urlBar.addEventListener("keypress",e=>{
        if(e.key=="Enter"){
            let urlTemp = urlBar.value.toLowerCase()
            if(urlTemp.startsWith("http://")||urlTemp.startsWith("https://")||urlTemp.startsWith("file://")){
                webview.src = urlBar.value
            } else if(urlTemp==="navigator://new-tab"){
                webview.src = homePage
            } else{
                webview.src = "http://"+urlBar.value
            }
            webview.focus()
        }
        
    })
})
