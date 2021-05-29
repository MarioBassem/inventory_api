const express = require('express');
const Product = require('../db/models/product');
const router = express.Router();
const auth = require('../auth/auth');

router.get('/', auth(''), (req, res) => {
    const products = Product.findAll();
    res.json(products);
});

router.get('/:id', auth(''), (req, res) => {

});

router.post('/', auth('post:products'), (req, res) => {

});

router.delete('/:d', auth('delete:products'), (req, res) => {

});

router.put('/:id', auth('put:products'), (req, res) => {

});

router.get('/s', auth(''), (req, res) => {
    //implement filtering using tags, categories and search terms

});

router.get('/:id/reviews', auth('get:product-reviews'), (req, res) => {

});

module.exports = router;