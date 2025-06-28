const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user.routes');

const connectDb = require('./db/db');
connectDb();

// resolving cors policy error 
app.use(cors());
app.use(express.json()); // for parsing application/json 
app.use(express.urlencoded({extended: true})); 

app.get('/',(req,res)=>{
    res.send("We are here to put a dent in the universe otherwise why else even be here!")
})

app.use('/users', userRoutes); 

module.exports = app;