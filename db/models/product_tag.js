const {DataTypes} = require('sequelize');
const db = require('../connection');
const Product = require('./product');
const Tag = require('./tag');

const product_tag = db.define('product_tag', {
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'product_id',
        },
        allowNull: false,
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Tag,
            key: 'tag_id',
        },
        allowNull: false,
    }
}, {
    freezeTableName: true
});

product_tag.sync({alter: true}).then(() => {
    console.log('prodcut_tag table ready...');
}).catch(err => {
    console.log('prodcut_tag table sync error: ' + err);
});

module.exports = product_tag;