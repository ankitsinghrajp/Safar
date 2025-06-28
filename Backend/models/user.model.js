const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type:String,
            required:true,
            minLength: [3,'First name must be atleast 3 characters long'],
            maxLength: [20,'First name must be atmost 20 characters long'],
        },
        lastname: {
            type:String,
            minLength: [3,'Last name must be atleast 3 characters long'],
            maxLength: [20,'Last name must be atmost 20 characters long'],
        }
    },
    email:{
        type:String,
        required: true,
        unique: true,
        minLength: [10,'Email must be atleast 10 characters long'],
    },
    password:{
        type:String,
        required:true,
        select: false, // This will not be returned in the response by default
    },
    socketId: {
        type:String,
    }
})


userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET || 'defghakdl')
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;
