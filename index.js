document.querySelector("input[type=submit]").addEventListener("click",e=>{
    e.preventDefault()
    location.replace("https://google.com/search?q="+document.getElementById("test").value)
})