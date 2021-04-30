const {DataTypes, DATE} = require('sequelize');
const db = require('../connection');

const User = db.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        comment: ' It can be Admin, Supplier, Salesperson, and Customer.'
    },
    first_name: {
        type: DataTypes.STRING,
    },
    middle_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    mobile: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password_hash: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING
    }
});

User.sync({alter: true}).then(() => {
    console.log('User table ready...');
}).catch(err => {
    console.log('User table sync error: ' + err);
});

module.exports = User;