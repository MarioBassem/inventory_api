const { DataTypes} = require('sequelize');
const db = require('../connection');

const Product = db.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
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

Product.sync({alter: true}).then(() => {
    console.log('Products table ready...');
}).catch(err => {
    console.log('Product table sync error: ' + err);
});

module.exports = Product;