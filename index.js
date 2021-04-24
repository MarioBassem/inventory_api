const express = require('express');
// const mongoose = require('mongoose');
const connectDB = require('./db/connection');

const app = express();
const PORT = 3000 || process.env.PORT;

connectDB();

const Product = require('./db/models/product');


app.get('/products', (req, res) => {
    //get all products
    Product.find({}).then(val => {
        console.log(val);
    })
});

app.post('products', (req, res) => {
    //insert product

    // Product.insertMany()
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

