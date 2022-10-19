window.addEventListener("DOMContentLoaded",()=>{
    const webview = document.querySelector("webview")
    const urlBar = document.querySelector("input[type=text]")
    window.api.sendUrl(webview.src)
    webview.addEventListener("update-target-url",(e,URL)=>{
        window.api.sendUrl(webview.getURL(),webview.getTitle())
        urlBar.value = webview.src
    })
    urlBar.value = webview.src
    urlBar.addEventListener("keypress",e=>{
        if(e.key=="Enter"){
            let urlTemp = webview.src.toLowerCase()
            console.log("a"+urlTemp);
            if(urlTemp.startsWith("http://")||urlTemp.startsWith("https://")||urlTemp.startsWith("/")||urlTemp.startsWith("C:/")||urlTemp.startsWith("D:/")||urlTemp.startsWith("E:/")){
                webview.src = url.value
                console.log('1');
            } else{
                console.log("2");
                webview.src = "http://"+urlBar.value
            }
            webview.focus()
        }
        
    })
})