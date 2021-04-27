const express = require('express');
const router = express.Router();
const Transaction = require('../db/models/transaction');

router.get('/', (req, res) => {
    //get all transactions
    Transaction.find({}).then(val => {
        const transactions = { transactions: [] };
        val.forEach(element => {
            transactions.transactions.push(element);
        });
        res.json(transactions)
    }).catch(err => {
        console.log(err);
    });
});

router.post('/', (req, res) => {
    //insert transaction  
    const transaction = req.body;
    Transaction.insertMany(transaction).then(val => {
        console.log(val);
    }).catch(err => {
        console.log(err);
    })
});

router.delete('/:id', (req, res) => {
    //delete transaction with id
    Transaction.deleteOne({_id: req.params.id}).then(ret => {
        console.log(ret);
    }).catch(err => {
        console.log(err);
    });
});

router.put('/:id', (req, res) => {
    //update transaction info
    const transaction = req.body;
    Transaction.updateOne({_id: req.params.id}, {$set: {
        content: transaction.content,
        total_cost: transaction.total_cost,
        total_retail_price: transaction.total_retail_price,
        createdAt: transaction.createdAt
    }}).then(ret => {
        console.log(ret);
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;