const {DataTypes} = require('sequelize');
const db = require('../connection');

const product_review = db.define('product_review', {
    product_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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

module.exports = product_review;