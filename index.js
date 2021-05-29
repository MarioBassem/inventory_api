const express = require('express');
const db = require('./db/connection');
const sync = require('./db/sync');


const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

db.authenticate().then(() => {
    console.log('Database Connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

sync();
require('dotenv').config();


//Routes
app.use('/signup', require('./routes/signup'));
app.use('/products', require('./routes/products'));
// app.use('/login', require('./routes/login'));
// app.use('/', require('./db/crud'));

app.listen(PORT, () => {
    console.log("Server is up and running");
});

