const db = require('../connection');
const Product = require('./product');
const Ingredient = require('./ingredient');

const product_ingredient = db.define('product_ingredient', {}, {
    freezeTableName: true
});

Product.belongsToMany(Ingredient, { 
    through: 'product_ingredient',
    sourceKey: 'id',
    foreignKey: 'product_id',
});
Ingredient.belongsToMany(Product, { 
    through: 'product_ingredient',
    sourceKey: 'id',
    foreignKey: 'ingredient_id',
});

module.exports = product_ingredient;