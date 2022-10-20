const fs = require("fs")

module.exports = (dataDir,bookmarks,bookmarksFile)=>{
    if(!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir)
    }
    fs.writeFileSync(bookmarksFile,"")
    bookmarks.forEach(bookmark => {
        fs.appendFileSync(bookmarksFile,bookmark.url+"\n"+bookmark.title+"\n")
    });
}
