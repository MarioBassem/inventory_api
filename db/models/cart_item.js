const {DataTypes} = require('sequelize');
const db = require('../connection');

const cart_item = db.define('cart_item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    }
});

module.exports = cart_item;