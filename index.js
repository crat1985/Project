window.addEventListener("DOMContentLoaded",()=>{
    const webview = document.querySelector("webview")
    const urlBar = document.querySelector("input[type=text]")
    const homePage = webview.src
    const urlBarEvent = (e)=>{
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
        
    }
    webview.addEventListener("dom-ready",()=>{
        let url = webview.getURL()
        let title = webview.getTitle()
        if(url===homePage){
            url = "navigator://new-tab"
        }
        window.api.sendUrlToMain(url,title)
        if(webview.getURL()===homePage){
            urlBar.value = "navigator://new-tab"
        } else {
            urlBar.value = webview.src
        }
        document.title = title+" - Navigateur Web"
        webview.addEventListener("did-start-loading",(e)=>{
            document.title = "Chargement en cours..."
            window.api.sendUrlToMain(webview.getURL(),webview.getTitle())
            if(webview.getURL()===homePage){
                urlBar.value = "navigator://new-tab"
            } else {
                urlBar.value = webview.src
            }
        })
        webview.addEventListener("did-stop-loading",()=>{
            document.title = webview.getTitle()+" - Navigateur Web"
        })
    })
    window.api.updateRendererURL((event,url)=>{
        if(url==="navigator://new-tab"){
            webview.src = homePage
            urlBar.value = "navigator://new-tab"
        } else{
            webview.src = url
            urlBar.value = webview.src
        }
    })
    urlBar.value = homePage
    urlBar.addEventListener("keypress",urlBarEvent)
})
