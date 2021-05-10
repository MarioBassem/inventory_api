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

Product.belongsToMany(Category, {through: Product_Category});
Category.belongsToMany(Product, {through: Product_Category});

// Product_Category.sync({alter: true}).then(() => {
//     console.log('prodcut_category table ready...\n');
// }).catch(err => {
//     console.log('prodcut_category table sync error: ' + err + '\n');
// });

module.exports = Product_Category;