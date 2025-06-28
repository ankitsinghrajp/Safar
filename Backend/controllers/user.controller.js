const userModel = require('../models/user.model')
const userService = require('../services/user.service');

const {validationResult} = require('express-validator');

// Lets create api for register user
module.exports.registerUser = async (req,res, next)=>{
    try {

        // Check validation errors 

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({"Validation failed": errors.array()})

        }
        const {fullname,email,password} = req.body;

        // Check if all fields are present
        if(!email || !fullname.firstname || !password){
               throw new Error("Please provide all required fields");
        }

          
        // hash the password
        const hashedPassword = await userModel.hashPassword(password);

        // Create user
        const savedUser = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        })

        const user = await userModel.findById(savedUser._id);
    if (!user) {
      return res.status(500).json({ error: "User creation failed" });
    }

        // Generate auth token 

        const token = user.generateAuthToken();

        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        })

    } catch (error){
        // console.error("Error in register user: ",error);
        throw new Error("Internal server error");
    }
}