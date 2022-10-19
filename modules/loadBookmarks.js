const fs = require("fs")

module.exports = (dataDir,bookmarksFile)=>{
    if(!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir)
    }
    if(!fs.existsSync(bookmarksFile)){
        fs.writeFileSync(bookmarksFile,"")
    }
    let bookmarksFileContent = fs.readFileSync(bookmarksFile).toString()
    let bookmarks = []
    if(bookmarksFileContent.length > 0){
        bookmarksFileContent.split("\n").forEach((bookmark,i,array)=>{
            if(i==0 && bookmark.length>0){
                bookmarks.push({url : bookmark, title: array[i+1]})
            } else if(i%2==0 && bookmark.length>0){
                bookmarks.push({url : bookmark, title: array[i+1]})
            }
        })
    }
    return bookmarks
}