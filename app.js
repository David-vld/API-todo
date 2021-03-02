// VARIABLES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let increment = 1;
let tableau = [];

app.use(bodyParser.json());
app.use(cors());

app.get('/api/todos', (req, res) => {
    res.json(tableau);
});

app.post('/api/todos', (req, res) => {
    let todo = { id: increment++, content: req.body.content };
    tableau.push(todo);
    res.json(todo);
});

app.delete('/api/todo/:id', (req, res) => {
    const index = tableau.findIndex(todo => todo.id === parseInt(req.params.id));
    if (index === -1)
        return res.status(404).json("Le todo est introuvable");

    tableau.splice(index, 1);
    res.json("Votre todo à bien été supprimé");
});

app.put('/api/todo/put/:id', (req, res) => {
    const todo = tableau.find(todo => todo.id === parseInt(req.params.id));
    if (!todo)
        return res.status(404).json("Le todo ne peut pas être modifié");
    
    todo.content = req.body.content;
    res.json(todo);
});

app.get('/api/todo/get/:id', (req, res) => {
   let todo = tableau.find(todo => todo.id === parseInt(req.params.id));
   if (!todo)
       return res.status(404).json("Le todo est introuvable");

    res.json(todo);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})