const db = require('../connection');
const Product = require('./product');
const Category = require('./category');

const Product_Category = db.define('product_category', {}, {
    freezeTableName: true
});

Product.belongsToMany(Category, {through: Product_Category, sourceKey: 'product_id', foreignKey: 'product_id'});
Category.belongsToMany(Product, {through: Product_Category, sourceKey: 'category_id', foreignKey: 'category_id'});

module.exports = Product_Category;