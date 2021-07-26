const express = require('express');
const validate = require('./validator.js')

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
    const validattionResults = validate(req);
    if(validattionResults.error) return res.status(400).send(validattionResults.error.details[0].message)
    else {
        const genre = {
            id : genres.length +1,
            title : validattionResults.value,
        }
        genres.push(genre)
        res.send(genre)
    }
  
})

app.put('/api/genres/:id', (req,res)=> {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('There exists no such genre');

    const validattionResults = validate(req);
    
    if(validattionResults.error) return res.status(400).send(validattionResults.error.details[0].message)
    else {
        genre.title = req.body.title;
        res.send(genre);
     } 
    
})

app.delete('/api/genres/:id',(req,res)=> {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('There exists no such genre');

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
})



app.listen(port,()=>{
    console.log(`service running on port ${port}`);
})

