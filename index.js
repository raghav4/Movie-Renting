const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); // For handling JSON PUT Requests

// List of genres
const genres = [{
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Horror'
    },
    {
        id: 3,
        name: 'Romance'
    },
];

// GET
// getting all the genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

// getting only single genre.
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('Request Genre with the given ID is not found!'); // 404 NOT FOUND!!
    }
    res.send(genre);
});
// POST : TODO INPUT Validation from the USER!! 
app.post('/api/genres', (req, res) => {

    const {
        error
    } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});
// PUT
app.put('/api/genres/:id', (req, res) => {
    // looking up for the genre
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('Request Genre with the given ID is not found!'); // 404 NOT FOUND!!

    //If doesn't exist return 404 // Not found
    const {
        error
    } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    //Validate
    // If invalid return 400 bad request

    //Update and return
});

app.delete('/api/courses/:id', (req, res) => {
    // Look, Exists? Delete , Return
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('Request Genre with the given ID is not found!'); // 404 NOT FOUND!!

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);

});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}
app.listen(3000, () => console.log('Listening on Port 3000...'));
// TODO : GET ✔️, POST ✔️ , INPUT VALIDATION ✔️ , PUT ✔️, DELETE ✔️