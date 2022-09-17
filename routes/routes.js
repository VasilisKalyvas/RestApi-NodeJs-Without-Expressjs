const { getProducts, getProductById, 
        createProduct, updateProduct, 
        deleteProduct, sortDescendingProduct,
        sortAscendingProduct
} = require('../controllers/productController');

function routes(req, res){

    if(req.url ==='/'){
        res.writeHeader(200, {'Content-Type': 'text/html'})
        //Home Page
        res.end('<h1>Welcome to Rest Api without Express.js</h1>'); // we need to stringify json file
    }

    else if(req.url ==='/api/products' && req.method === 'GET'){
       getProducts(req, res)
    }

    else if(req.url.match(/\/api\/products\/([A-Za-z0-9-\\-]*)/) && req.method === 'GET'){
        //I use regex because without express i cant use /api/products/:id and take the req.param.id
        const id = req.url.split('/')[3] // I split /api/product/:id by '/' and i need id so i take the index = 3
        getProductById(req, res, id)
    }

    else if(req.url === '/api/products' && req.method === 'POST'){
        createProduct(req, res)
    }

    else if(req.url.match(/\/api\/products\/([A-Za-z0-9-\\-]*)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    }

    else if(req.url.match(/\/api\/products\/([A-Za-z0-9-\\-]*)/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    }

    else if(req.url ==='/api/sortproducts/ascending' && req.method === 'GET'){
        sortAscendingProduct(req, res)
    }

    else if(req.url ==='/api/sortproducts/descending' && req.method === 'GET'){
        sortDescendingProduct(req, res)
    }

    else{
        res.writeHeader(404, {'Content-Type': 'text/html'})
        //Page not Found
        res.end('<h1>Page Not Found</h1>'); // we need to stringify json file
    }
}

module.exports = {
    routes
}