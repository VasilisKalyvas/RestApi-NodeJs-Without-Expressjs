const Product = require('../models/productModel')
const { getRequestData } = require('../utils')

async function getProducts(req, res) {
    try{
        const products = await Product.findAllProducts();
        res.writeHeader(200, {'Content-Type': 'application/json'})
        //Fetch Products
        res.end(JSON.stringify(products)); // we need to stringify json file
    } catch (error) {
        console.log(error)
    }
}

async function getProductById(req, res, id) {
    try{
        const product = await Product.findById(id);
        if(product){
            res.writeHeader(200, {'Content-Type': 'application/json'})
            //Fetch Product 
            res.end(JSON.stringify(product)); // we need to stringify json file
        } 
        else{
            res.writeHeader(404, {'Content-Type': 'text/html'})
            res.end('<h1>Product Not Found</h1>');
        }
    } catch (error) {
        console.log(error)
    }
}

async function createProduct(req, res) {
    try{
        const body = await getRequestData(req)
        const { title, description, price } = JSON.parse(body)
        const product  = { 
            title, 
            description , 
            price 
        }

        const newProduct = await Product.create(product)
        if(newProduct){
            res.writeHeader(200, {'Content-Type': 'application/json'})
            //Fetch New Product 
            res.end(JSON.stringify(newProduct))// we need to stringify json file
        } 
        else{
            res.writeHeader(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product did not create'}));
        }
    } catch (error) {
        console.log(error)
    }
}

async function updateProduct(req, res, id) {
    try{
        const Findproduct = await Product.findById(id);

        if(!Findproduct){
            res.writeHeader(404, {'Content-Type': 'text/html'})
            res.end('<h1>Product Not Found</h1>'); // we need to stringify json file
        }
        else{
            const body = await getRequestData(req)
            const { title, description, price } = JSON.parse(body)
            const product  = { 
                title: title || Findproduct.title, 
                description: description || Findproduct.description, 
                price: price || Findproduct.price
            }
            
            const updatedProduct = await Product.update(id, product)
            if(updatedProduct){
                res.writeHeader(200, {'Content-Type': 'application/json'})
                //Fetch Updated Product 
                res.end(JSON.stringify(updatedProduct))// we need to stringify json file
            } 
            else{
                res.writeHeader(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: 'Product did not update'}));
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function deleteProduct(req, res, id) {
    try{
        const Findproduct = await Product.findById(id);

        if(!Findproduct){
            res.writeHeader(404, {'Content-Type': 'text/html'})
            res.end('<h1>Product Not Found</h1>'); // we need to stringify json file
        }
        else{
            
            await Product.remove(id)
            res.writeHeader(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Product: ${id} deleted `}));
        }
    } catch (error) {
        console.log(error)
    }
}

async function sortAscendingProduct(req, res) {
    try{
        const products = await Product.orderByPriceAscending();
        res.writeHeader(200, {'Content-Type': 'application/json'})
        //Fetch Products
        res.end(JSON.stringify(products)); // we need to stringify json file
    } catch (error) {
        console.log(error)
    }
}

async function sortDescendingProduct(req, res){
    try{
        const products = await Product.orderByPriceDescending();
        res.writeHeader(200, {'Content-Type': 'application/json'})
        //Fetch Products
        res.end(JSON.stringify(products)); // we need to stringify json file
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    sortAscendingProduct,
    sortDescendingProduct
}