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
app.get('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send('Request Genre with the given ID is not found!'); // 404 NOT FOUND!!
    }
    res.send(genre);
});
// POST : TODO INPUT Validation from the USER!! 
app.post('/api/genres', (req,res)=>{
    if(!req.body.name || req.body.name.length<2){
        // Bad request
        res.status(400).send('Bad Request!!');
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});
app.listen(3000, () => console.log('Listening on Port 3000...'));
// TODO : GET ✔️, POST ✔️ , INPUT VALIDATION :  