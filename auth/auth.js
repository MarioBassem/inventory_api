const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Permission = require('../db/models/permission');
const Role = require('../db/models/role');
const User = require('../db/models/user');

module.exports = async function(req, res, next){
    try{
        const header = req.headers.authorization;
        if(!header){
            throw new Error('Authorizatino header missing!');
        }

        const payload = await get_payload(header);

        const user = await User.findOne({where: {
            id: payload.id
        }});

        // check if user exists
        if(!user){
            throw new Error('User does not exist!');
        }

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

        console.log(JSON.stringify(permissions, null, 2));
        
        await check_permissions(payload, permissions);

        console.log(payload);
        next();
    }catch(err){
        console.log('Error: ' + err + '\n');
    }
}

async function get_payload(header){
    const parts = header.split(' ');
        
    if(parts[0].toLowerCase() != 'bearer'){
        throw new Error('Authorization header must start with "Bearer".');
    }

    if(parts.length == 1){
        throw new Error('Token not found!');
    }

    if(parts.length > 2){
        throw new Error('Authorization header must be bearer token');
    }

    const token = parts[1];

    return await jwt.verify(
        token,
        process.env.TOKEN_SECRET
    );
}

async function check_permissions(payload, permissions){
    
}

