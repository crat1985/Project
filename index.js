window.addEventListener("DOMContentLoaded",()=>{
    const webview = document.querySelector("webview")
    const url = document.querySelector(".url")
    const form = document.querySelector(".form")
    window.api.sendUrl(webview.src)
    webview.addEventListener("update-target-url",(e,URL)=>{
        window.api.sendUrl(webview.src)
        url.value = webview.src
    })
    url.value = webview.src
    form.addEventListener("submit",e=>{
        e.preventDefault()
        let urlTemp = webview.src.toLowerCase()
        console.log("a"+urlTemp);
        if(urlTemp.startsWith("http://")||urlTemp.startsWith("https://")||urlTemp.startsWith("/")||urlTemp.startsWith("C:/")||urlTemp.startsWith("D:/")||urlTemp.startsWith("E:/")){
            webview.src = url.value
            console.log('1');
            return
        } else{
            console.log("2");
            webview.src = "http://"+url.value
        }
    })
})