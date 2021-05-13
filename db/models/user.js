const {DataTypes, DATE} = require('sequelize');
const db = require('../connection');
const Address = require('./address');
const Cart = require('./cart');
const Ingredient = require('./ingredient');
const Order = require('./order');
const product_review = require('./product_review');
const Transaction = require('./transaction');

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: {
                args: [1, 50],
                msg: 'First name must have length within 1 and 50'
            }
        }
    },
    middle_name: {
        type: DataTypes.STRING(50),
        validate: {
            len: {
                args: [0, 50],
                msg: 'Middle name must have length less than 50',
            }
        }
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: {
                args: [1, 50],
                msg: 'Last name must have length within 1 and 50'
            }
        }
    },
    mobile: {
        type: DataTypes.STRING(20),

    },
    email: {
        type: DataTypes.STRING(75),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: {
                args: [1, 75],
                msg: 'Email length must be within 1 and 75',
            }
        }
    },
    password_hash: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    registered_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    intro: {
        type: DataTypes.TEXT
    }
});

User.hasMany(Address, { 
    sourceKey: 'id', 
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT'
});
// Address.belongsTo(User);

User.hasMany(Transaction, {
    sourceKey: 'id',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    },
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT'
});
// Transaction.belongsTo(User);

User.hasMany(product_review, {
    sourceKey: 'id',
    foreignKey: {
        name: 'user_id',
        allowNull: true
    },
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT',
});
// product_review.belongsTo(User);

User.hasMany(Order, {
    sourceKey: 'id',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    },
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT'
});
// Order.belongsTo(User);

User.hasMany(Cart, {
    sourceKey: 'id',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
});
// Cart.belongsTo(User);

User.hasMany(Ingredient, {
    sourceKey: 'id',
    foreignKey: {
        name: 'supplier_id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT',
})

module.exports = User;