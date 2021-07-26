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

app.post('/api/genres',(req,res)=> {
    const schema = Joi.object({
        title : Joi.string().max(15).min(2).required(),
    })
    const validattionResults = schema.validate(req.body);
    
    if(validattionResults.error) return res.status(400).send(validattionResults.error.details[0].message)
    else {
        const genre = {
            id : genres.length +1,
            title : validattionResults.value.title,
        } 

        genres.push(genre)
        res.send(genres)
    }

})

app.listen(port,()=>{
    console.log(`service running on port ${port}`);
})