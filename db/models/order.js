const {DataTypes} = require('sequelize');
const db = require('../connection');
const order_item = require('./order_item');

const Order = db.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    type: {
        type: DataTypes.SMALLINT,
        comment: 'The order type to distinguish among Purchase Order (0) or Customer Order (1).',
        allowNull: false,
        validate: {
            isIn: [[0, 1]]
        }
    },
    status: {
        type: DataTypes.SMALLINT,
        comment: 'The status of the order can be New, Checkout, Paid, Failed, Shipped, Delivered, Returned, and Complete.',
        allowNull: false,
    },
    sub_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    item_discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tax: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    shipping_charges: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    promo: {
        type: DataTypes.STRING(20),
    },
    total_discount: {
        type: DataTypes.FLOAT,
        comment: 'item discount plus promo discount'
    },
    grand_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        comment: 'used to store the additional details of the order.'
    }
});

Order.hasMany(order_item, {
    sourceKey: 'id',
    foreignKey: {
        name: 'order_id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

module.exports = Order;