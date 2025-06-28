const express = require('express');

const router = express.Router();

const {body} = require("express-validator");

const userController = require('../controllers/user.controller');

// Register user

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be atleast 3 characters long'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long'),

], userController.registerUser);
module.exports = router;