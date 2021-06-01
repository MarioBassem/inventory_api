const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const auth = require('../auth/auth');
const Product = require('../db/models/product');
const product_review = require('../db/models/product_review');
const User = require('../db/models/user');
const logError = require('../error_log');


router.get('/profile', auth(''), async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
            attributes: ['id', 'first_name', 'middle_name', 'last_name', 'email', 'mobile', 'intro']
        });
        if(!user) throw new Error('User does not exist');
        if(user.revoked_token) throw new Error('Revoked token');
        res.json(user);
    }catch(err){
        logError(err);
    }
});

router.get('/products', auth(''), async (req, res) => {
    try{
        const products = await Product.findAll({
            where: {
                supplier_id: req.user.id,
            },
        });
        res.json(products);
    }catch(err){
        logError(err);
    }
});

router.post('/products', auth(''), async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
            attributes: ['id'],
        });
        const product = await Product.create(req.body);
        user.addProduct(product);
        res.json(product);
    }catch(err){
        logError(err);
    }
});

router.get('/profile/reviews', auth(''), async (req, res) => {
    try{
        const where = {
            user_id: req.user.id
        };
        if(req.query.id !== undefined) where.id = req.query.id;
        if(req.query.product-id !== undefined) where.product_id = req.query.product-id;
        const reviews = await product_review.findAll({
            where: where
        });
        res.json(reviews);
    }catch(err){
        logError(err);
    }
});

router.post('/profile/reviews', auth(''), async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
            attributes: ['id']
        });
        const review = await product_review.create(req.body);
        user.addProduct_review(review);
        res.json(review);
    }catch(err) {
        logError(err);
    }
});

router.put('/:id', auth(''), (req, res) => {

});

router.delete('/:id', auth(''), (req, res) => {

});

router.post('/:id/addresses', auth(''), (req, res) => {

});

router.delete('/:id', auth(''), (req, res) => {

});

module.exports = router;