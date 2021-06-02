const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const Address = require('../db/models/address');
const Product = require('../db/models/product');
const product_review = require('../db/models/product_review');
const User = require('../db/models/user');
const logError = require('../error_log');

//get profile info
router.get('/profile', auth(''), async (req, res) => {
    try{
        res.json(req.user);
    }catch(err){
        logError(err);
    }
});

//update profile info
router.put('/profile', auth(''), async (req, res) => {
    try{
        res.json(await User.update(
            req.body,
            {
                where: {
                    id: req.user.id
                }
            }
        ));
    }catch(err){
        logError(err);
    }
});

//delete profile
router.delete('/profile', auth(''), async (req, res) => {
    try{
        res.json(await User.destroy({
            where: {
                id: req.user.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

//get user products
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

//create new user product
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

//get user reviews, or identified review
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

//create new review
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

//handling user addresses
//get user addresses
router.get('/profile/addresses', auth(''), async (req, res) => {
    try{
        res.json(await Address.findAll({
            where: {
                user_id: req.user.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

router.post('/profile/addresses', auth(''), async (req, res) => {
    try{
        const address = await Address.create(req.body);
        const user = req.user;
        user.addAddress(address);
        res.json(address);
    }catch(err){
        logError(err);
    }
});

router.put('/profile/addressses', auth(''), async (req, res) => {
    try{
        res.json(await Address.update(req.body, {
            where: {
                user_id: req.user.id
            }
        }));
    }catch(err){
        logError(err);
    }
})

/*
user has addresses - crud
user has carts - crud
user has orders - create, read only
user makes transactions - create, read
user categorizes products
user tags products
user provides ingredients
*/

module.exports = router;