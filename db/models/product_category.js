const {DataTypes} = require('sequelize');
const db = require('../connection');
const Product = require('./product');
const Category = require('./category');

const Product_Category = db.define('product_category', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id',
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id'
        }
    }
}, {
    freezeTableName: true
});

Product_Category.sync({alter: true}).then(() => {
    console.log('prodcut_category table ready...');
}).catch(err => {
    console.log('prodcut_category table sync error: ' + err);
});

module.exports = Product_Category;