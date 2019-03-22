const express = express();
const router = express.Router();

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
router.get('/', (req, res) => {
    res.send(genres);
});
// getting only single genre.
router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('Request Genre with the given ID is not found!'); // 404 NOT FOUND!!
    }
    res.send(genre);
});
// POST : TODO INPUT Validation from the USER!! 
router.post('/', (req, res) => {

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
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;