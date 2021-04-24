const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    content: [],
    total: Number,
});