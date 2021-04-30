const express = require('express');
const db = require('./db/connection');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

db.authenticate().then(() => {
    console.log('Database Connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

//Routes
app.use('/products', require('./routes/products'));
app.use('/transactions', require('./routes/transactions'));



app.listen(PORT, () => {
    console.log("Server is up and running");
});

