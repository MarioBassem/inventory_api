const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    unit_type: String,
    stock: Number,
    other: {},
});

const product = mongoose.model('Product', productSchema);

module.exports = product;

