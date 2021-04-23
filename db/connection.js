const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27020/inventory';

try{
    mongoose.connect(connectionString, {useNewUrlParser: true});
    
}catch(err){
    console.log(err);
}

