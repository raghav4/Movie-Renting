const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 250
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    }   
}));

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(250).required().email(),
        password: Joi.string().min(5).max(1000).required()
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;