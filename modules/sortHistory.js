module.exports = (array)=>{
    return array.sort((a,b)=>{
        let dateA = a.dateUnix
        let dateB = b.dateUnix
        if(parseInt(dateA)>parseInt(dateB)){
            return -1
        } else if(parseInt(dateA)<parseInt(dateB)){
            return 1
        }
        return 0
    })
}