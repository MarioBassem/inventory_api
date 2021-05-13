const express = require('express');
const router = express.Router();
const Address = require('../db/models/address');
const cart_item = require('../db/models/cart_item');
const Cart = require('../db/models/cart');
const Category = require('../db/models/category');
const Ingredient = require('../db/models/ingredient');
const order_item = require('../db/models/order_item');
const Order = require('../db/models/order');
const product_review = require('../db/models/product_review');
const Product = require('../db/models/product');
const Role = require('../db/models/role');
const Tag = require('../db/models/tag');
const Transaction = require('../db/models/transaction');
const User = require('../db/models/user');

const map = {
    'users': User,
    'transactions': Transaction,
    'tags': Tag,
    'roles': Role,
    'products': Product,
    'product_reviews': product_review,
    'orders': Order,
    'order_items': order_item,
    'ingredients': Ingredient,
    'categories': Category,
    'carts': Cart,
    'cart_items': cart_item,
    'addresses': Address
};

router.get('/:table_name', async (req, res) => {
    const table = map[req.params.table_name];
    const ret = await table.findAll();
    res.json(ret);
});

router.post('/:table_name', async (req, res) => {
    const table = map[req.params.table_name];
    const body = req.body;
    const ret = await table.create(body);
    res.json(ret);
});

router.delete('/:table_name/:id', async (req, res) => {
    const table = map[req.params.table_name];
    const id = req.params.id;
    const ret = await table.destroy({where: {
        id: id
    }});
    res.json(ret);
});

router.put('/:table_name/:id', async (req, res) => {
    const table = map[req.params.table_name];
    const id = req.params.id;
    const body = req.body;
    const ret = await table.update(body, {
        where: {
            id: id
        }
    });
    res.json(ret);
});

module.exports = router;

