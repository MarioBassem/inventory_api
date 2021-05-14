const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../db/models/user');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
            try{
                //check if email is in database
                const dbUser = await User.findOne({
                    where: {
                        email: email
                    }
                });
                if(!dbUser){
                    return done(null, false, {message: 'Incorrect Credentials!'});
                }

                //check if password is correct
                const isMatch = await bcrypt.compare(password, dbUser.password_hash);
                const user = {
                    first_name: dbUser.first_name,
                    middle_name: dbUser.middle_name,
                    last_name: dbUser.last_name,
                    email: dbUser.email,
                    mobile: dbUser.mobile,
                    intro: dbUser.intro,
                }
                if(isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, {message: 'Incorrect Credentials!'});
                }
            } catch(err){
                console.log(err);
            }
        })
    )
}