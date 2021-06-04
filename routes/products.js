const express = require('express');
const Product = require('../db/models/product');
const router = express.Router();
const auth = require('../auth/auth');
const logError = require('../error_log');
const Review = require('../db/models/review');
const { route } = require('./users');

//get products
router.get('/', auth(''), async (req, res) => {
    try{
        const where = {};
        if(req.query.id !== undefined) where.id = req.query.id;
        if(req.query.uid !== undefined) where.supplier_id = req.query.uid;
        res.json(await Product.findAll({
            where: where
        }));
    }catch(err){
        logError(err);
    }
});

router.post('/', auth(''), async(req, res) => {
    try{
        const product = Product.create(req.body);
        const user = req.user;
        user.addProduct(product);
        res.json(product);
    }catch(err){
        logError(err);
    }
});

router.put('/:id', auth(''), async (req, res) => {
    try{
        res.json(await Product.update(req.body, {
            where: {
                id: req.params.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

router.delete('/:id', auth(''), async (req, res) => {
    try{
        res.json(await Product.destroy({
            where: {
                id: req.params.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

//handling product reviews
router.get('/:id/reviews', auth(''), async (req, res) => {
    try{
        const where = {};
        if(req.query.id !== undefined) where.id = req.query.id;
        if(req.query.uid !== undefined) where.supplier_id = req.query.uid;
        res.json(await Product.findAll({
            where: where,
        }));
    }catch(err){
        logError(err);
    }
});

router.post('/:id/reviews', auth(''), async (req, res) => {
    try{
        const review = await Review.create(req.body);
        const user = req.user;
        const product = await Product.findOne({
            where: {
                id: req.params.id,
            }
        });
        user.addReview(review);
        product.addReview(review);
        res.json(review);
    }catch(err){
        logError(err);
    }
});

router.put('/reviews/:id', auth(''), async(req, res) => {
    try{
        res.json(await Review.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

router.delete('/reviews/:id', auth(''), async(req, res) => {
    try{
        res.json(await Review.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }));
    }catch(err){
        logError(err);
    }
});



module.exports = router;