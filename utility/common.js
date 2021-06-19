const fs = require("fs")

exports.readFile = (path, format) =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(path,format, (err, data) =>{
            if(err) {
                reject(err)
            }
            resolve(JSON.parse(data))
        })
    })
}

exports.writeFile = (path, data) => {
    return new Promise((resolve, reject) =>{
        fs.writeFile(path,JSON.stringify(data), (err) =>{
            if(err) reject(err)
            resolve("done")
        })
    })
}