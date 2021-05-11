const {DataTypes} = require('sequelize');
const db = require('../connection');
const Order = require('./order');

const Address = db.define('address', {
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: User,
    //         key: 'user_id',
    //     }
    // },
    // order_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Order,
    //         key: 'order_id'
    //     }
    // },
    first_name: {
        type: DataTypes.STRING(50),
    },
    middle_name: {
        type: DataTypes.STRING(50),
    },
    last_name: {
        type: DataTypes.STRING(50),
    },
    mobile: {
        type: DataTypes.STRING(15),
    },
    email: {
        type: DataTypes.STRING(50),
        validate: {
            isEmail: true
        }
    },
    line1: {
        type: DataTypes.STRING(50),
    },
    line2: {
        type: DataTypes.STRING(50),
    },
    city: {
        type: DataTypes.STRING(50),
    },
    province: {
        type: DataTypes.STRING(50),
    },
    country: {
        type: DataTypes.STRING(50),
    },
});

Address.hasMany(Order, {
    sourceKey: 'address_id',
    foreignKey: {
        name: 'address_id',

    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
});

// Address.sync({alter: true}).then(() => {
//     console.log('Address table ready...\n');
// }).catch(err => {
//     console.log('Address table sync error: ' + err + '\n');
// });

module.exports = Address;