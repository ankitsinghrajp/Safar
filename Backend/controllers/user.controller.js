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

module.exports.loginUser = async (req,res,next)=>{
    try {

        // Check validation errors
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({"Validation failed": errors.array()});
        }

        const {email,password} = req.body;
        // Check if all fields are present
        if(!email || !password){
            return res.status(400).json({error: "Please provide all required fields"});
        }

        // Find user by email
        const user = await userModel.findOne({
               email: email
        }).select('+password'); // Include password field for comparision as by default password is not come as we give in model select false for password this is how you can retrieve it 


        if(!user){
             return res.status(401).json({error: "This email is not registered with us try Sign up"});
        }
        // Check if password is correct
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid credentials!"})
        }
        
        const token = user.generateAuthToken();

        res.status(200).json({
            message:"User logged in successfully",
            user,
            token
        })

    }catch (error){
        console.error("Error in login user: ",error);
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports.getUserProfile = async (req,res,next)=>{
    return res.status(200).json(req.user);
}