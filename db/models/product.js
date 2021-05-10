const { DataTypes} = require('sequelize');
const db = require('../connection');
const cart_item = require('./cart_item');
const order_item = require('./order_item');

const Product = db.define('product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    sourceKey: 'product_id',
    foreignKey: {
        name: 'product_id',

    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
});
order_item.belongsTo(Product);

Product.hasMany(cart_item, {
    sourceKey: 'product_id',
    foreignKey: {
        name: 'product_id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
});
cart_item.belongsTo(Product);

Product.sync({alter: true}).then(() => {
    console.log('Products table ready...\n');
}).catch(err => {
    console.log('Product table sync error: ' + err + '\n');
});

module.exports = Product;