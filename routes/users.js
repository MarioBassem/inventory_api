const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        const user = await User.create(req.body);

        const token = await jwt.sign({
            id: user.id, 
            email: user.email,
            first_name: user.first_name,
            permissions: []
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