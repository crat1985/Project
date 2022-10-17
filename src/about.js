window.addEventListener("DOMContentLoaded",()=>{
    document.querySelector("button").addEventListener("click",e=>{
        window.close()
    })
    let authors = document.getElementsByClassName("span")
    authors[0].addEventListener("click",e=>{
        window.open("https://github.com/"+authors[0].innerText,"_blank")
    })
    authors[1].addEventListener("click",e=>{
        window.open("https://github.com/"+authors[1].innerText,"_blank")
    })
})