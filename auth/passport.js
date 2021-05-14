const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../db/models/user');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},(email, password, done) => {
            //TODO: does querying a record faster than generating password hash????????
            
        })
    )
}