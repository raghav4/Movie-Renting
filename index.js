const express = require('express');
const genres = require('./router/genres');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/MovieRenting')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Trouble Connecting to MongoDb...'));
app.use(express.json()); // For handling JSON PUT Requests
app.use('/api/genres', genres); // Any  route with /api/courses should be handled as genres router
// List of genres

app.listen(3000, () => console.log('Listening on Port 3000...'));
// TODO : GET ✔️, POST ✔️ , INPUT VALIDATION ✔️ , PUT ✔️, DELETE ✔️