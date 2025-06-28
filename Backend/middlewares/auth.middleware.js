const userModel = require('../models/user.model');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports.authUser = async (req,res,next)=>{
    const token =req.headers.authorization.split(' ')[1];

    console.log(req.headers);
    if(!token){
     
        return res.status(401).json({error:"Unauthorized access, please login first"});
    }

    console.log("Token received: ",token);
   

    try {
        console.log("the jwt secret from env: ",process.env.JWT_SECRET);
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);
        if(!user){
            return res.status(401).json({error: "Unauthorized access, please login first"});
        }

        req.user = user; // Attach user to request object
        return next();
    } catch (error) {
        console.error("Error in authUser middleware: ",error);
        return res.status(401).json({error: "Unauthorized access, please login first"});
    
    }
}