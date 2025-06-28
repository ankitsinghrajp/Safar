const express = require('express');

const router = express.Router();

const {body} = require("express-validator");

const authMiddleware = require('../middlewares/auth.middleware');

const userController = require('../controllers/user.controller');

// Register user

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be atleast 3 characters long'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long'),

], userController.registerUser);


// login route

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters')
],
userController.loginUser);

// Get user profile

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);




module.exports = router;