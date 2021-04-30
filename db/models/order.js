const {DataTypes} = require('sequelize');
const db = require('../connection');
const User = require('./user');

const Order = db.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    type: {
        type: DataTypes.INTEGER,
        comment: 'The order type to distinguish among Purchase Order or Customer Order.'
    },
    status: {
        type: DataTypes.INTEGER,
        comment: 'The status of the order can be New, Checkout, Paid, Failed, Shipped, Delivered, Returned, and Complete.',
    },
    sub_total: {
        type: DataTypes.INTEGER,
    },
    item_discount: {
        type: DataTypes.FLOAT
    },
    tax: {
        type: DataTypes.FLOAT
    },
    shipping_charges: {
        type: DataTypes.FLOAT,
    },
    total: {
        type: DataTypes.FLOAT
    },
    promo: {
        type: DataTypes.STRING,
    },
    total_discount: {
        type: DataTypes.FLOAT,
        comment: 'item discount plus promo discount'
    },
    grand_total: {
        type: DataTypes.FLOAT,

    },
    content: {
        type: DataTypes.STRING,
        comment: 'used to store the additional details of the order.'
    }
});

Order.sync({alter: true}).then(() => {
    console.log('Order table ready...');
}).catch(err => {
    console.log('Order table sync error: ' + err);
});

module.exports = Order;