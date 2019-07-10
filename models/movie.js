const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie){
    const schema = {
        title: Joi.string().trim().min(3).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number.min(0).max(255).required(),
        dailyRentalRate: Joi.number.min(0).max(255).required()
    };
    return Joi.validate(movie,schema);
    // What the Client Send to Us.
}

exports.Movie = Movie;
exports.validate = validateMovie;