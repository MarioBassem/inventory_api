const {DataTypes} = require('sequelize');
const db = require('../connection');
// const Product = require('./product');
// const Cart = require('./cart');

const cart_item = db.define('cart_item', {
    cart_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    // product_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Product,
    //         key: 'product_id',
    //     },
    //     allowNull: false,
    // },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    // cart_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Cart,
    //         key: 'cart_id'
    //     },
    //     allowNull: false,
    // },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    }
});

// cart_item.sync({force: true}).then(() => {
//     console.log('cart_item table ready...\n');
// }).catch(err => {
//     console.log('cart_item table sync error: ' + err + '\n');
// });

module.exports = cart_item;