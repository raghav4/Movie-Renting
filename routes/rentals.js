const {Rental,validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router(); 
const mongoose = require('mongoose');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rentals.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not available');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc: {
                    numberInStock: -1
                }
            })
            .run();

        res.send(rental);
    } catch (ex) {
        res.status(500).send('Something Failed');
    }
    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
    res.send(rental);
});
module.exports = router;