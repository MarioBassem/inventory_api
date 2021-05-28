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

        console.log(JSON.stringify(permissions, null, 2));
        
        check_permissions(payload, permission);

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

async function check_permissions(payload, permission){
    //check if permissions are included in jwt
    if(!payload.permissions){
        throw new Error('Permissions are not included in JWT');
    }
    //check if user has right permissions
    if(!payload.permission.includes(permission)){
        throw new Error('Permission not found');
    }
}

