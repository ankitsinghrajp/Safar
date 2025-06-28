const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
         console.log("Database Connection Successful!");
    }).catch((err)=>{
        console.error("Database Connection Failed!",err);
    })
}

module.exports = connectDb;