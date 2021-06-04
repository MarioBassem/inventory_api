const express = require('express');
const Transaction = require('../db/models/transaction');
const router = express.Router();
const logError = require('../error_log');

router.get('/', auth(''), async(req, res) => {
    try{
        const where = {};
        if(req.query.id !== undefined) where.id = req.query.id;
        if(req.query.uid !== undefined) where.user_id = req.query.uid;
        res.json(await Transaction.findAll({
            where: where
        }));
    }catch(err) {
        logError(err);
    }
});

router.post('/', auth(''), async (req, res) => {
    try{
        const user = req.user;
        const transaction = await Transaction.create(req.body);
        user.addTransactino(transaction);
        res.json(transaction);
    }catch(err){
        logError(err);
    }
});

router.put('/:id', auth(''), async (req, res) => {
    try{
        res.json(await Transaction.update(req.body, {
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
        res.json(await Transaction.destroy({
            where:{
                id: req.params.id
            }
        }));
    }catch(err){
        logError(err);
    }
});