const express = require('express');
// const mongoose = require('mongoose');
const connectDB = require('./db/connection');

const app = express();
const PORT = 3000 || process.env.PORT;

connectDB();

app.use(express.json());

const Product = require('./db/models/product');


app.get('/products', (req, res) => {
    //get all products
    Product.find({}).then(val => {
        const products = { products: [] };
        val.forEach(element => {
            products.products.push(element);
        });
        res.json(products)
    }).catch(err => {
        console.log(err);
    });
});

app.post('/products', (req, res) => {
    //insert product  
    const product = req.body;
    Product.insertMany(product).then(val => {
        console.log(val);
    }).catch(err => {
        console.log(err);
    })
});

app.delete('/products/:id', (req, res) => {
    //delete product with id
    Product.deleteOne({_id: req.params.id}).then(ret => {
        console.log(ret);
    }).catch(err => {
        console.log(err);
    });
});

app.put('/products/:id', (req, res) => {
    //update product info
    const product = req.body;
    Product.updateOne({_id: req.params.id}, {$set: {
        name: product.name,
        price: product.price,
        unit_type: product.unit_type,
        stock: product.stock
    }}).then(ret => {
        console.log(ret);
    }).catch(err => {
        console.log(err);
    })
});

app.listen(PORT, () => {
    console.log("Server is up and running");
});

