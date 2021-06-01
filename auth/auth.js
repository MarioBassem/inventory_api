const jwt = require('jsonwebtoken');
const User = require('../db/models/user');

module.exports = (permission) => async (req, res, next) => {
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

        if(user.revoked_token){
            throw new Error('Token revoked');
        }

        
        check_permissions(payload, permission);

        console.log(payload);

        req.user = user;

        next();
    }catch(err){
        console.log('Error: ' + err + '\n');
    }
}

async function get_payload(header){
    try{
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
    } catch(err){
        console.log(err + '\n');
    }
    
}

async function check_permissions(payload, permission){
    //check if permissions are included in jwt
    if(!payload.permissions){
        throw new Error('Permissions are not included in JWT');
    }
    
    //check if no permission is provided
    if(!permission) return;

    //check if user has right permissions
    if(!payload.permissions.includes(permission)){
        throw new Error('Permission not found');
    }
}

