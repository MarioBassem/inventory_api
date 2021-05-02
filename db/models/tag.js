const {DataTypes} = require('sequelize');
const db = require('../connection');

const Tag = db.define('tag', {
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(100),
    },
    content: {
        type: DataTypes.TEXT
    },
});

Tag.sync({alter: true}).then(() => {
    console.log('Tag table ready...');
}).catch(err => {
    console.log('Tag table sync error: ' + err);
});

module.exports = Tag;