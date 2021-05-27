const {DataTypes} = require('sequelize');
const db = require('../connection');

const Permission = db.define('permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permission: {
        type: DataTypes.STRING(30),
    }
});

module.exports = Permission;