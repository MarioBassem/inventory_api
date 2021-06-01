const User = require('../db/models/user');
const Role = require('../db/models/role');
const Permission = require('../db/models/permission');
const Product = require('../db/models/product');

module.exports = async function(){

    console.log('hiiiiiiiiiiiiiii \n');
    const user = await User.create({
        first_name: 'mario',
        last_name: 'asdf',
        email: 'm1@gmail.com',
        password_hash: '120389j192f8j',
    });

    const role = await Role.create({
        title: 'admin',
    });

    await role.addUser(user);

    const permission = await Permission.create({
        permission: 'read',
    });

    const permission2 = await Permission.create({
        permission: 'write'
    });

    role.addPermission(permission);
    role.addPermission(permission2);

    const role2 = await Role.create({
        title: 'manager'
    });
    permission.addRole(role2);

    const permissions = await Permission.findAll({
        attributes: ['permission'],
        include: {
            model: Role,
            through: {
                where: {
                    role_id: user.role_id
                },
            },
            attributes: []
        },
    });
    
    const product = await Product.create({
        title: 'ahwa',
        cost_price: '100',
        selling_price: '200',
    });
    user.addProduct(product);

}