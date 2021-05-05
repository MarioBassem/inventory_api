const {DataTypes} = require('sequelize');
const db = require('../connection');

const Role = db.define('role', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            len: {
                args: [1, 20],
                msg: 'Role title length must be within 1 and 20',
            }
        }
    }
});

Role.sync({alter: true}).then(() => {
    console.log('Role table ready...');
}).catch(err => {
    console.log('Role table sync error: ' + err);
});

module.exports = Role;