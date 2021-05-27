const User = require('./models/user');
const Permission = require('./models/permission');
const Transaction = require('./models/transaction');
const Tag = require('./models/tag');
const Role = require('./models/role');
const Product = require('./models/product');
const product_tag = require('./models/product_tag');
const product_review = require('./models/product_review');
const product_ingredient = require('./models/product_ingredient');
const product_category = require('./models/product_category');
const Order = require('./models/order');
const order_item = require('./models/order_item');
const Ingredient = require('./models/ingredient');
const Category = require('./models/category');
const Cart = require('./models/cart');
const cart_item = require('./models/cart_item');
const Address = require('./models/address');
const permission_role = require('./models/permission_role');

const sync = async function(){
    try{
        await Permission.sync({force: true});
        await Role.sync({force: true});
        await User.sync({force: true});
        await Transaction.sync({force: true});
        await Tag.sync({force: true});
        await Product.sync({force: true});
        await Ingredient.sync({force: true});
        await Category.sync({force: true});
        await product_tag.sync({force: true});
        await product_review.sync({force: true});
        await product_ingredient.sync({force: true});
        await product_category.sync({force: true});
        await Address.sync({force: true});
        await Order.sync({force: true});
        await order_item.sync({force: true});
        await Cart.sync({force: true});
        await cart_item.sync({force: true});
        await permission_role.sync({force: true});
        console.log('tables ready...\n');

        require('../test/test')();

    } catch(err){
        console.log('Sync error: ' + err + '\n');
    }
}

module.exports = sync;