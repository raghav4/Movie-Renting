const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('Joi');
const router = express.router(); //

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

// Get API

router.get('/', async (req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// Getting only single customer

router.get('/:id',async (req,res)=>{
    const customer = await Customer.findById(req.params.id);
    // If not found, then return error status 404
    if(!customer){
        res.status(404).send('Customer with the given ID is not found!');
    }
    res.send(customer);
});

// Post API

router.post('/',async(req,res)=>{
 // Before posting check the validation error , if the input is correct or not using Joi.
    const { error } = validateCustomer(req.body);
    if (error)
    {
        res.status(400).send(error.details[0].message);
    }
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    customer = await customer.save(); // so, earlier we created the for the post and after it gets done storing in the db we've updated it with the ID.
    res.send(customer);
});

router.put('/:id', async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    // Looking up for the customer
    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }, { new: true }) // Look into it
      if (!customer) return res.status(404).send('The customer with the given ID was not found.');
      res.send(customer);
});

router.delete('/:id', async(req, res) => {
    // Look, Exists? Delete , Return
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) res.status(404).send('Request Customer with the given ID is not found!'); // 404 NOT FOUND!!
    res.send(customer);

});
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.number().min(5).max(50).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

module.exports = router;