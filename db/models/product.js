const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ data: {}});

const product = mongoose.model('Product', productSchema);

module.export = product;

