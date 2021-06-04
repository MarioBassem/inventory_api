const {DataTypes} = require('sequelize');
const db = require('../connection');
const cart_item = require('./cart_item');

const Cart = db.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    session_id: {
        type: DataTypes.STRING(75),
    },
    token: {
        type: DataTypes.STRING,
        comment: 'a token to identify cart over multiple sessions',
    },
    first_name: {
        type: DataTypes.STRING(50),
    },
    middle_name: {
        type: DataTypes.STRING(50),
    },
    last_name: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING(75),
        validate: {
            isEmail: true,
        }
    },
    content: {
        type: DataTypes.TEXT,
    }
});

Cart.hasMany(cart_item, {
    sourceKey: 'id',
    foreignKey: {
        name: 'cart_id',

    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Cart;