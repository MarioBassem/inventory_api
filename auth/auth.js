const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next){
    try{
        const header = req.headers.authorization;
        if(!header){
            throw new Error('Authorizatino header missing!');
        }

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

        const decoded = await jwt.verify(
            token,
            process.env.TOKEN_SECRET
        );
        
        console.log(decoded);
        next();
    }catch(err){
        console.log('Error: ' + err + '\n');
    }
}