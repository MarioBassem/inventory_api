const express = require('express');
const { where } = require('sequelize/types');
const router = express.Router();
const auth = require('../auth/auth');
const Address = require('../db/models/address');
const Product = require('../db/models/product');
const Review = require('../db/models/review');
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

//handling user addresses
//get user addresses
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
        if(req.query.id !== undefined) where.id = req.params.id;
        res.json(await Address.delete(req.body, {
            where: where
        }));
    }catch(err){
        logError(err);
    }
});

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