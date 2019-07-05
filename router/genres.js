const {Genre,validate} = require('../models/genre')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET - getting all the genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});
// getting only single genre.
router.get('/:id',async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        res.status(404).send('Request Genre with the given ID is not found!'); // 404 NOT FOUND!!
    }
    res.send(genre);
});
router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});
// PUT
router.put('/:id', async(req, res) => {
    const {error} = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name}, { new: true})
    // looking up for the genre
    if (!genre) res.status(404).send('Request Genre with the given ID is not found!'); // 404 NOT FOUND!!

    //Validate

    //Update and return
    res.send(genre);
});

router.delete('/:id', async(req, res) => {
    // Look, Exists? Delete , Return
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) res.status(404).send('Request Genre with the given ID is not found!'); // 404 NOT FOUND!!

    res.send(genre);

});

module.exports = router;