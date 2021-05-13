const {DataTypes} = require('sequelize');
const db = require('../connection');

const Tag = db.define('tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: {
                args: [[1, 50]],
                msg: 'Tag title length must be within 1 and 50',
            }
        }
    },
    slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [[1, 50]],
                msg: 'Slug length must be within 1 and 100'
            }
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
});

module.exports = Tag;