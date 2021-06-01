const { DataTypes} = require('sequelize');
const db = require('../connection');
const cart_item = require('./cart_item');
const order_item = require('./order_item');
const product_review = require('./product_review');

const Product = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [1, 100],
                msg: 'Product title length must be within 1 and 100',
            }
        }
    },
    cost_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    selling_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    expire_date: {
        type: DataTypes.DATE,
    },
    summary: {
        type: DataTypes.TEXT,
        comment: "For product highlights"
    },
    content: {
        type: DataTypes.TEXT,
        comment: "For more product details"
    }
});

Product.hasMany(order_item, {
    sourceKey: 'id',
    foreignKey: {
        name: 'product_id',

    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
});

Product.hasMany(cart_item, {
    sourceKey: 'id',
    foreignKey: {
        name: 'product_id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
});

Product.hasMany(product_review, {
    sourceKey: 'id',
    foreignKey: {
        name: 'product_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
});

module.exports = Product;