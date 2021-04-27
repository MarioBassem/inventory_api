const express = require('express');
const connectDB = require('./db/connection');

const app = express();
const PORT = 3000 || process.env.PORT;

connectDB();

app.use(express.json());

//Routes
app.use('/products', require('./routes/products'));
app.use('/transactions', require('./routes/transactions'));



app.listen(PORT, () => {
    console.log("Server is up and running");
});

