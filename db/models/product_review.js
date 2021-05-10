const {DataTypes} = require('sequelize');
const db = require('../connection');
const Product = require('./product');
const User = require('./user');

const product_review = db.define('prodcut_review', {
    product_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    // user_id: {
        
    // },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'product_id',
        },
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(75),
        validate: {
            len: {
                args: [0, 75],
                msg: 'Product review title length must be less than 75'
            }
        }
    },
    rating: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

// product_review.belongsTo(User);

product_review.sync({alter: true}).then(() => {
    console.log('product_review table ready...\n');
}).catch(err => {
    console.log('product_review table sync error: ' + err + '\n');
});

module.exports = product_review;