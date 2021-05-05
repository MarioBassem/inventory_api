const {DataTypes, DATE} = require('sequelize');
const db = require('../connection');

const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        comment: ' It can be Admin, Supplier, Salesperson, and Customer.',
        allowNull: false,
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

User.sync({alter: true}).then(() => {
    console.log('User table ready...');
}).catch(err => {
    console.log('User table sync error: ' + err);
});

module.exports = User;