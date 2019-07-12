const config = require('config');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const home = require('./routes/home');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/movie-renting')
    .then(() => console.log('Connected to Mongodb...'))
    .catch(err => console.error('Could not connect to Mongodb...'))

// Templating Engines
app.set('view engine', 'pug');
app.set('views', './views');

// Routes
app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 3000;
app.listen((PORT), () => console.log(`Listening on port ${PORT}...`));