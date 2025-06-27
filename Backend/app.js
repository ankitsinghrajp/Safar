const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();


// resolving cors policy error 
app.use(cors());

app.get('/',(req,res)=>{
    res.send("We are here to put a dent in the universe otherwise why else even be here!")
})

module.exports = app;