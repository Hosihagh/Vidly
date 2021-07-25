const express = require('express');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const genres = [
    { id:1 , title: 'Thriller'},
    { id:2 , title: 'Action'},
]

app.get('/api/genres', (req,res)=> {
    res.send(genres)
})

app.get('/api/genres/:id',(req,res)=> {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre not found');

    res.send(genre)
})

app.listen(port,()=>{
    console.log(`service running on port ${port}`);
})