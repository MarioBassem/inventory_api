const {DataTypes} = require('sequelize');
const db = require('../connection');

const Ingredient = db.define('ingredient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(75),
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Ingredient;