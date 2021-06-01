const {Sequelize} = require('sequelize');

module.exports = new Sequelize({
    username: 'superluigi',
    password: 'password',
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'shop_api',
});
