const {DataTypes} = require('sequelize');
const db = require('../connection');
const Product = require('./product');
const Tag = require('./tag');

const product_tag = db.define('product_tag', {}, {
    freezeTableName: true
});

Product.belongsToMany(Tag, {through: product_tag, sourceKey: 'id', foreignKey: 'product_id'});
Tag.belongsToMany(Product, {through: product_tag, sourceKey: 'id', foreignKey: 'tag_id'});

module.exports = product_tag;