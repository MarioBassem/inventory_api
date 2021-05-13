const {DataTypes} = require('sequelize');
const db = require('../connection');

const Transaction = db.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    payment_id: {
        type: DataTypes.STRING(50),
        comment: 'The payment id provided by the payment gateway.'
    },
    payment_type: {
        type: DataTypes.STRING(20),
        comment: 'Cash, cash on delivery, cheque, or online.',
        allowNull: false,
        validate: {
            isIn: {
                args: [['cash', 'cash on delivery', 'cheque', 'online']],
                msg: 'Payment type must be cash, cash on delivery, cheque, or online.',
            },
            isOnlinePayment(value){
                if(value === 'online' && this.payment_id === null){
                    throw new Error('Payment id must be provided with online payments');
                }
            }
        }
    },
    content: {
        type: DataTypes.STRING,
        comment: 'used to store the additional details of the transaction.'
    }
    
});


module.exports = Transaction;