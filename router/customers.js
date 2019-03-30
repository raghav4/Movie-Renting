const {Customer,validate} = require('../models/customer'); // No need of '.' customer 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.router(); //
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
    const { error } = validate(req.body);
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
    const {error} = validate(req.body);
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

module.exports = router;