const {DataTypes} = require('sequelize');
const db = require('../connection');
const Order = require('./order');
const User = require('./user');

const Transaction = db.define('transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        }
    },
    order_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'order_id',
        }
    },
    payment_id: {
        type: DataTypes.STRING,
        comment: 'The payment id provided by the payment gateway.'
    },
    payment_type: {
        type: DataTypes.STRING,
        comment: 'Cash, cash on delivery, cheque, or online.'
    },
    content: {
        type: DataTypes.STRING,
        comment: 'used to store the additional details of the transaction.'
    }
    
});

Transaction.sync({alter: true}).then(() => {
    console.log('Transaction table ready...');
}).catch(err => {
    console.log('Transaction table sync error: ' + err);
});

module.exports = Transaction;