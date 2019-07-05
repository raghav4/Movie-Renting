const mongoose = require('mongoose');
const Joi = require('Joi');
const Customer = mongoose.model('Customer',new mongoose.Schema({
    name:{
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true
    },
    isGold:{
        type:  Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.number().min(5).max(50).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;