const Joi = require('joi');
const express = require('express');
const app = express(); 
const genres = require('./routes/genres');
const home = require('./routes/home');

app.use(express.json());  
app.use('/',home);
app.set('view engine', 'pug');
app.use('/api/genres',genres);

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`)); 

// whenever the route /api/genres is called, then the express application will call on to the genres module.
// same in the other case like home.