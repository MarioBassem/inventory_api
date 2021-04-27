const express = require('express');
const router = express.Router();
const Product = require('../db/models/product');

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
    //insert product  
    const product = req.body;
    Product.insertMany(product).then(val => {
        console.log(val);
    }).catch(err => {
        console.log(err);
    })
});

router.delete('/:id', (req, res) => {
    //delete product with id
    Product.deleteOne({_id: req.params.id}).then(ret => {
        console.log(ret);
    }).catch(err => {
        console.log(err);
    });
});

router.put('/:id', (req, res) => {
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

module.exports = router;