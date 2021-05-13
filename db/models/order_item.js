const {DataTypes} = require('sequelize');
const db = require('../connection');

const order_item = db.define('order_item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    }
});

module.exports = order_item;