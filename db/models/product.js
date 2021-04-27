const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    unit_type: String,
    stock: Number,
    category: String,
    cost: Number,
    retail_price: Number,
    other: {},
});

const product = mongoose.model('Product', productSchema);

module.exports = product;

