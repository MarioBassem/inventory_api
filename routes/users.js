const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const bcrypt = require('bcrypt');

router.post('/', async(req, res, next) => {
    try{
        console.log(req.body);
        console.log('middleware**********');
        const password = req.body.password;
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if(user){
            throw new Error('Email already exists');
        }
        //generate hash
        const hash = await bcrypt.hash(password, 10);
        req.body.password_hash = hash;
        delete req.body.password;

        next();

    } catch(err) {
        console.log(err);
    }
    
});

module.exports = router;