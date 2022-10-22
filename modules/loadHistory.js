const fs = require("fs")
const getHumanDate = require("./getHumanDate")
module.exports = (historyFile)=>{
    if(!fs.existsSync(historyFile)){
        fs.writeFileSync(historyFile,"")
    }
    let historyFileContent = fs.readFileSync(historyFile).toString("utf-8")
    let history = []
    historyFileContent.split("\n").forEach(historyInfos=>{
        let historyTemp = historyInfos.split("\t")
        if(historyTemp.length>=3){
            history.push({url:historyTemp[0],title:historyTemp[1],date:getHumanDate(new Date(parseInt(historyTemp[2]))),dateUnix:historyTemp[2]})
        }
    })
    return history
}