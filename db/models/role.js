const {DataTypes} = require('sequelize');
const db = require('../connection');
const User = require('./user');

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

Role.hasMany(User, {
    sourceKey: 'role_id',
    foreignKey: 'role_id',
    onDelete: 'SET DEFAULT',
    onUpdate: 'SET DEFAULT'
});
// User.belongsTo(Role);

// Role.sync({alter: true}).then(() => {
//     console.log('Role table ready...\n');
// }).catch(err => {
//     console.log('Role table sync error: ' + err + '\n');
// });

module.exports = Role;