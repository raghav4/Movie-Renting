const express = require('express');
const genres = require('./router/genres');
const customers = require('./router/customers');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/MovieRenting')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Trouble Connecting to MongoDb...'));
app.use(express.json()); // For handling JSON PUT Requests
app.use('/api/genres', genres); // Any  route with /api/courses should be handled as genres router
app.use('/api/customers',customers); // Any  route with /api/customers should be handled as customers router

app.listen(3000, () => console.log('Listening on Port 3000...'));
// TODO : GET ✔️, POST ✔️ , INPUT VALIDATION ✔️ , PUT ✔️, DELETE ✔️