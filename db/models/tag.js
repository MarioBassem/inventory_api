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
        validate: {
            len: {
                args: [1, 50],
                msg: 'Tag title length must be within 1 and 50',
            }
        }
    },
    slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            args: [1, 100],
            msg: 'Slug length must be within 1 and 100',
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
});

Tag.sync({alter: true}).then(() => {
    console.log('Tag table ready...');
}).catch(err => {
    console.log('Tag table sync error: ' + err);
});

module.exports = Tag;