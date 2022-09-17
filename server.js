const http = require('http');
const { routes } = require('./routes/routes');
const port = 5000;

const server = http.createServer((req, res) => {
    routes(req, res);
})

server.listen(port, function(error) {
    if(error){
        console.log('Error:', error)
    }else{
        console.log('Server is running on port: ', port)
    }
})