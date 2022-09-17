const fs = require('fs')

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

function getRequestData(req) {
   return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
   })
}

module.exports = {
    writeDataToFile,
    getRequestData
}