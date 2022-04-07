const express = require('express');
const app = express();
const port = 3000;
let data = require('./data.json');
//vet ej om .json behover sta med
//const object = JSON.parse(data);
//console.log(data)
const landscapes = [];

//object['landscapes'].push({})
//console.log(object)

app.use('/', express.static('public'));
app.use(express.json());

//Gets data from file and shows it in the UI
app.get('/api/landscapes', (req, res) => {
    res.send(data);
    console.log("rad 18", data)
}); 

app.post('/api/landscapes', (req, res) => {
    const landscape = req.body;
    landscapes.push(landscape);
    //landscapes.push(req.body);
    res.status(201); //Kolla om den kan andras
    /*    res.send({
        type: "post",
        name: req.body.name,
        flower: req.body.flower,
        animal: req.body.animal
    }); */
    
    
    app.put('/api/landscapes/:id', (req, res) => {
        res.send('Landskap uppdaterat')
    });
    
    app.delete('/landscapes/:id', (req, res) => {
        res.send('Landskap borttaget')
    })
})

app.listen(port, () => console.log(`app is running on port: ${port}`));