const express = require('express');
const repository = require('./repository.js');

const app = express()
const port = 3000;

app.get('/', (req, res) => res.send('Welcome!'));

app.get('/api/:name', async (req, res) => {
    const name = req.params.name;
    const result = await repository.getMusicBArtist(name);
    res.send(result)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))