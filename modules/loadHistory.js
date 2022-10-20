const fs = require("fs")
module.exports = (historyFile)=>{
    if(!fs.existsSync(historyFile)){
        fs.writeFileSync(historyFile,"")
    }
    let historyFileContent = fs.readFileSync(historyFile).toString("utf-8")
    let history = []
    historyFileContent.split("\n").forEach(historyInfos=>{
        let historyTemp = historyInfos.split("\t")
        if(historyTemp.length>=3){
            history.push({url:historyTemp[0],title:historyTemp[1],date:historyTemp[2]})
        }
    })
    return history
}