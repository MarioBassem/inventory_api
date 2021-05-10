const {DataTypes} = require('sequelize');
const db = require('../connection');

const Transaction = db.define('transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: User,
    //         key: 'user_id',
    //     },
    //     allowNull: false,
    //     validate: {
    //         isNumeric: true,
    //     }
    // },
    // order_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Order,
    //         key: 'order_id',
    //     },
    //     allowNull: false,
    //     validate: {
    //         isNumeric: true
    //     }
    // },
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

Transaction.sync({alter: true}).then(() => {
    console.log('Transaction table ready...\n');
}).catch(err => {
    console.log('Transaction table sync error: ' + err + '\n');
});

module.exports = Transaction;