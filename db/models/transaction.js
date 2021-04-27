const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    content: [],
    total_cost: Number,
    total_retail_price: Number,
    createdAt: {type: Date, default: Date.now}
});

const transaction = mongoose.model('Transaction', transactionSchema);

module.exports = transaction;