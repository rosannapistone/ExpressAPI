/* const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let landscapes = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/landscape', (req, res) => {
    const landscape = req.body;

    console.log(landscape);
    landscapes.push(landscape);

    res.send('landscape har adderats till databasen')
})



app.listen(port, () => console.log(`appen lyssnar port:${port}`)) */