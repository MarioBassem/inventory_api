const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Permission = require('../db/models/permission');
const Role = require('../db/models/role');
const {create, read, update, remove} = require('../db/crud');

router.post('/', async(req, res) => {
    try{
        //check if email exists
        if(await User.findOne({where: {email : req.body.email}})){
            throw new Error('Email already exists!');
        }
        const password = req.body.password;
        if(password.length < 8){
            throw new Error('Password length must be more than 7');
        }
        //generate hash
        const hash = await bcrypt.hash(password, 10);

        req.body.password_hash = hash;

        delete req.body.password;

        const user = await create('users', req.body);

        // const admin = await Role.findOne({where: {title: 'admin'}});
        // admin.addUser(user);

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

        const token = await jwt.sign({
            id: user.id, 
            email: user.email,
            first_name: user.first_name,
            permissions: permissions
        }, 
            process.env.TOKEN_SECRET, 
        {
            expiresIn: '1800s'
        });

        res.json(token);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;