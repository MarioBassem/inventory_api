const express = require('express');
const db = require('./db/connection');
const Address = require('./db/models/address');
const Transaction = require('./db/models/transaction');
const Cart = require('./db/models/cart');
const User = require('./db/models/user');
const Tag = require('./db/models/tag');
const Role = require('./db/models/role');
const Product = require('./db/models/product');
const product_tag = require('./db/models/product_tag');
const product_review = require('./db/models/product_review');
const product_ingredient = require('./db/models/product_ingredient');
const prodcut_category = require('./db/models/product_category');
const Order = require('./db/models/order');
const order_item = require('./db/models/order_item');
const Ingredient = require('./db/models/ingredient');
const Category = require('./db/models/category');
const cart_item = require('./db/models/cart_item');


const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

db.authenticate().then(() => {
    console.log('Database Connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

//Routes
// app.use('/products', require('./routes/products'));
// app.use('/transactions', require('./routes/transactions'));



app.listen(PORT, () => {
    console.log("Server is up and running");
});

