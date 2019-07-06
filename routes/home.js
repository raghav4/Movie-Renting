const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index', {title:'Movie Renting', message:'Please check out documentation'})
});

module.exports = router;