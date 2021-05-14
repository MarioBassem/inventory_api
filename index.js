const express = require('express');
const db = require('./db/connection');
const sync = require('./db/sync');
const passport = require('passport');
require('./auth/passport')(passport);


const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

db.authenticate().then(() => {
    console.log('Database Connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

sync();

app.use(passport.initialize());

//Routes
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));
app.use('/', require('./routes/crud'));




app.listen(PORT, () => {
    console.log("Server is up and running");
});

