const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./router/genres');
app.use(express.json()); // For handling JSON PUT Requests
app.use('/api/genres',genres); // Any  route with /api/courses should be handled as genres router
// List of genres

app.listen(3000, () => console.log('Listening on Port 3000...'));
// TODO : GET ✔️, POST ✔️ , INPUT VALIDATION ✔️ , PUT ✔️, DELETE ✔️