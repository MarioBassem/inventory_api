const {DataTypes} = require('sequelize');
const db = require('../connection');

const Review = db.define('review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

module.exports = Review;