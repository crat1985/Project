module.exports = ()=>{
    let date = new Date()
    return ("0"+date.getHours()).slice(-2)+":"+("0"+date.getMinutes()).slice(-2)+":"+("0"+date.getSeconds()).slice(-2)+" "+("0"+date.getDate()).slice(-2)+"/"+("0"+date.getMonth()).slice(-2)+"/"+date.getFullYear()
}