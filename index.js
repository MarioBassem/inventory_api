const {router, express} = require('express');
const mongo = require('mongodb');
const Product = require('./db/models/product');

const app = express();
const PORT = 3000 || process.env.PORT;

app.get('products', (req, res) => {
    //get all products
    
});

app.post('products', (req, res) => {
    //insert product
});

app.delete('products/:id', (req, res) => {
    //delete product with id id
});

app.put('products/:id', (req, res) => {
    //update product info
});

app.listen(PORT, () => {
    console.log("Server is up and running");
});

