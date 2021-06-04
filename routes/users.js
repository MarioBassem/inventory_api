const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const Address = require('../db/models/address');
const Cart = require('../db/models/cart');
const cart_item = require('../db/models/cart_item');
const User = require('../db/models/user');
const logError = require('../error_log');

//handling profile info
router.get('/profile', auth(''), async (req, res) => {
    try{
        res.json(req.user);
    }catch(err){
        logError(err);
    }
});

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

//handling user addresses
router.get('/profile/addresses', auth(''), async (req, res) => {
    try{
        const where = {
            user_id: req.user.id
        };
        if(req.query.id !== undefined) where.id = req.query.id;
        res.json(await Address.findAll({
            where: where
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

router.put('/profile/addressses/:id', auth(''), async (req, res) => {
    try{
        res.json(await Address.update(req.body, {
            where: {
                user_id: req.user.id,
                id: req.params.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

router.delete('/profile/addresses', auth(''), async (req, res) => {
    try{
        const where = {
            user_id: req.user.id
        };
        if(req.query.id !== undefined) where.id = req.query.id;
        res.json(await Address.delete(req.body, {
            where: where
        }));
    }catch(err){
        logError(err);
    }
});

//handling user cart
router.get('/profile/cart', auth(''), async (req, res) => {
    try{
        const cart = await Cart.findOne({
            where:{
                user_id: req.user.id,
            },
            attributes: ['id']
        });
        res.json(await cart_item.findAll({
            where:{
                cart_id: cart.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

module.exports = router;