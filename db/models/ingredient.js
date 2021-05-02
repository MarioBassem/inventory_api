const {DataTypes} = require('sequelize');
const db = require('../connection');
const User = require('./user');

const Ingredient = db.define('ingredient', {
    ingredient_id: {
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
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
        allowNull: true,
    }
});

Ingredient.sync({alter: true}).then(() => {
    console.log('Ingredient table created...');
}).catch(err => {
    console.log('Ingredient table sync error: ' + err);
});

module.exports = Ingredient;