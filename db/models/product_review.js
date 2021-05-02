const {DataTypes} = require('sequelize');
const db = require('../connection');
const Product = require('./product');

const product_review = db.define('prodcut_review', {
    product_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'product_id',
        }
    },
    title: {
        type: DataTypes.STRING(75),
    },
    rating: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

product_review.sync({alter: true}).then(() => {
    console.log('product_review table ready...');
}).catch(err => {
    console.log('product_review table sync error: ' + err);
});

module.exports = product_review;