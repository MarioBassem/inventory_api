const {DataTypes} = require('sequelize');
const db = require('../connection');
const Product = require('./product');
const Order = require('./order');

const order_item = db.define('order_item', {
    order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'product_id',
        },
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'order_id'
        },
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    }
});

order_item.sync({alter: true}).then(() => {
    console.log('order_item table ready...');
}).catch(err => {
    console.log('order_item table sync error: ' + err);
});

module.exports = cart_item;