const Address = require('./models/address');
const cart_item = require('./models/cart_item');
const Cart = require('./models/cart');
const Category = require('./models/category');
const Ingredient = require('./models/ingredient');
const order_item = require('./models/order_item');
const Order = require('./models/order');
const Review = require('./models/review');
const Product = require('./models/product');
const Role = require('./models/role');
const Tag = require('./models/tag');
const Transaction = require('./models/transaction');
const User = require('./models/user');

const map = {
    'users': User,
    'transactions': Transaction,
    'tags': Tag,
    'roles': Role,
    'products': Product,
    'reviews': Review,
    'orders': Order,
    'order_items': order_item,
    'ingredients': Ingredient,
    'categories': Category,
    'carts': Cart,
    'cart_items': cart_item,
    'addresses': Address
};

const create = async function(table_name, body){
    try{
        const table = map[table_name];
        return await table.create(body);
    } catch(err){
        console.log(err + '\n');
    }
}

const read = async function(table_name){
    try{
        const table = map[table_name];
        return await table.findAll();
    }catch(err){
        console.log(err + '\n');
    }
}

const update = async function(table_name, body, id){
    try{
        const table = map[table_name];
        return await table.update(body, {
            where: {
                id: id
            },
            
        });
    }catch(err){
        console.log(err + '\n');
    }
}

const remove = async function(table_name, id){
    try{
        const table = map[table_name];
        return await table.destroy({where: {
            id: id
        }});
    }catch(err){
        console.log(err + '\n');
    }
}

module.exports = {
    create, 
    read,
    update, 
    remove,
}