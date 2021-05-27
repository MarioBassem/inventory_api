const db = require('../connection');
const Permission = require('./permission');
const Role = require('./role');

const permission_role = db.define('permission_role', {}, {
    freezeTableName: true,
});

Permission.belongsToMany(Role, {
    through: 'permission_role',
    sourceKey: 'id',
    foreignKey: 'permission_id',
});
Role.belongsToMany(Permission, {
    through: 'permission_role',
    sourceKey: 'id',
    foreignKey: 'role_id',
});

module.exports = permission_role;
