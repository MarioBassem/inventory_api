const {DataTypes, DATE} = require('sequelize');
const db = require('../connection');

const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        comment: ' It can be Admin, Supplier, Salesperson, and Customer.'
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
    mobile: {
        type: DataTypes.STRING(20),
    },
    email: {
        type: DataTypes.STRING(75),
    },
    password_hash: {
        type: DataTypes.STRING(50),
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