const {DataTypes} = require('sequelize');
const db = require('../connection');

const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(75),
        allowNull: false,
        validate: {
            len: {
                args: [1, 75],
                msg: 'Category title length must be within 1 and 75',
            }
        }
    },
    meta_title: {
        type: DataTypes.STRING,
        comment: 'used for browser title and SEO.'
    },
    slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT
    }
});

Category.hasMany(Category, {
    sourceKey: 'id',
    foreignKey: {
        name: 'parent_id',
        allowNull: true,
    },
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
});

module.exports = Category;
