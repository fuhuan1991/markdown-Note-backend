const express = require('express');
const dataOperations = require('./repositories/index.js');

const app = express()
const port = 3000;
const { getUserById } = dataOperations;


app.get('/', (req, res) => res.send('Welcome!'));

app.get('/api/user/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getUserById(id);
    res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))