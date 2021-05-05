const {DataTypes} = require('sequelize');
const db = require('../connection');

const Category = db.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    parent_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'category_id',
        }
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

Category.sync({alter: true}).then(() => {
    console.log('Category table ready...');
}).catch(err => {
    console.log('Category table sync error: ' + err);
});

module.exports = Category;
