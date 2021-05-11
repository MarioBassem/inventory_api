const {DataTypes} = require('sequelize');
const db = require('../connection');
const Product = require('./product');
const Ingredient = require('./ingredient');

const product_ingredient = db.define('product_ingredient', {
//     product_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Product,
//             key: 'product_id',
//         },
//         allowNull: false,
//     },
//     ingredient_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Ingredient,
//             key: 'ingredient_id',
//         },
//         allowNull: false,
//     }
}, {
    freezeTableName: true
});

Product.belongsToMany(Ingredient, { 
    through: 'product_ingredient',
    sourceKey: 'product_id',
    foreignKey: 'product_id',
});
Ingredient.belongsToMany(Product, { 
    through: 'product_ingredient',
    sourceKey: 'ingredient_id',
    foreignKey: 'ingredient_id',
});

// product_ingredient.sync({alter: true}).then(() => {
//     console.log('product_ingredient table ready...\n');     
// }).catch(err => {
//     console.log('product_ingredient table sync error: ' + err + '\n');
// });

module.exports = product_ingredient;