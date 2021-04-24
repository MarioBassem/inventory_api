
const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect('mongodb://localhost:27017/inventory', {
       useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Mongodb Connected...');
}

module.exports = connectDB;