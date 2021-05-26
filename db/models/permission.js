const {DataTypes} = require('sequelize');
const db = require('../connection');
const Role = require('./role');

const Permission = db.define('permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permissinons: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false,
    }
});

Permission.hasMany(Role, {
    sourceKey: 'id',
    foreignKey: 'permission_id',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});

module.exports = Permission;