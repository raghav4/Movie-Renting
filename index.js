const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //bodyparse: post se req.body me data bharne ka kaam iska he. 

// GET - Getting the list of all genres.
const genres = [{id:1,name:'Action'},{id:2,name:'Horror'},{id:3,name:'Romance'}];
app.get('/api/genres',(req,res)=>{
    res.send(genres);
});
// GET - Getting a single genre.
app.get('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Request Genre with the Given ID is not found!');
    res.send(genre);
});
// POST - Creating the genre.
app.post('/api/genres',(req,res)=>{
    // Check for the validation before posting.
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});
app.put('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=>g.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send("Requested Genre is not Found!!");
    }
    const {error} = validateGenre(req.body);
    if(error)   return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});
app.delete('/api/genres/:id',(req,res)=>{
    // Search for the given id
    const genre = genres.find(g=>g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Requested Genre not found!');
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genres);
});
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`)); // listening on the given port.

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre,schema);
}

//TODO : Get : All ✅, Get: Single Genre ✅, Post  ✅