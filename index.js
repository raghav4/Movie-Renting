const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const home = require('./routes/home');
const rentals = require('./routes/rentals');

mongoose.connect('mongodb://localhost/movie-renting')
    .then(()=>console.log('Connected to Mongodb...'))
    .catch(err=>console.error('Could not connect to Mongodb...'))

// Templating Engines
app.set('view engine','pug');
app.set('views','./views');

// Routes
app.use(express.json());
app.use('/',home);
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
const PORT = process.env.port || 3000;
app.listen((3000),()=>console.log(`Listening on Port ${PORT}...`));