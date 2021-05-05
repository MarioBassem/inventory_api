const {DataTypes} = require('sequelize');
const db = require('../connection');
const User = require('./user');
const Address = require('./address');

const Cart = db.define('cart', {
    cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
        allowNull: false,
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
    address_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Address,
            key: 'address_id',
        }
    },
    content: {
        type: DataTypes.TEXT,
    }
});

Cart.sync({alter: true}).then(() => {
    console.log('Cart table ready...');
}).catch( err => {
    console.log('Cart table sync error: ' + err);
});

module.exports = Cart;