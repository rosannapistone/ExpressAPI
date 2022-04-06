const express = require('express');
const app = express();
const port = 3000;
let data = require('./data.json');
//vet ej om .json behover sta med

const landscapes = [
  /*   {
        "name": "Västra Götaland",
        "flower": "Ljung",
        "animal": "Trana",
        "id": 1
    },
    {
        "name": "Närke",
        "flower": "Gullviva",
        "animal": "Hasselmus",
        "id": 2
    },
    {
        "name": "Hälsingland",
        "flower": "Lin",
        "animal": "Lodjur",
        "id": 3
    } */
];

app.use('/', express.static('public'));
app.use(express.json());


app.get('/api/landscapes', (req, res) => {
    res.send(data);
});

app.post('/api/landscapes', (req, res) => {
    const landscape = req.body;
    console.log(landscape);
    landscapes.push(landscape);
    //landscapes.push(req.body);
    res.status(201); //Kolla om den kan andras
    res.send({
        type: "post",
        name: req.body.name,
        flower: req.body.flower,
        animal: req.body.animal
    });
    

    app.put('/api/landscapes/:id', (req, res) => {
        res.send('Landskap uppdaterat')
    });

    app.delete('/landscapes/:id', (req, res) => {
        res.send('Landskap borttaget')
    })
})

app.listen(port, () => console.log(`app is running on port: ${port}`));