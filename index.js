const express = require('express');
const app = express();
const port = 3000;
let data = require('./data.json');

//Nytt
const bodyParser = require('body-parser');
//vet ej om .json behover sta med
//const object = JSON.parse(data);
//console.log(data)

//Nytt
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const routes = require('./routes/routes')(app, fs);


//object['landscapes'].push({})
//console.log(object)

/* const landscapes = [];

app.use('/', express.static('public'));
app.use(express.json()); */

//Gets data from file and shows it in the UI
/* app.get('/api/landscapes', (req, res) => {
    res.send(data);
    console.log("rad 18", data)
});  */

/* app.post('/api/landscapes', (req, res) => {
    const landscape = req.body;
    landscapes.push(landscape); */
    //landscapes.push(req.body);
    //res.status(201); //Kolla om den kan andras
    /*    res.send({
        type: "post",
        name: req.body.name,
        flower: req.body.flower,
        animal: req.body.animal
    }); */
    
    /* 
    app.put('/landscapes/:id', (req, res) => {
        res.send('Landskap uppdaterat')
    });
    
    app.delete('/landscapes/:id', (req, res) => {
        res.send('Landskap borttaget')
    })
})
 */
app.listen(port, () => console.log(`app is running on port: ${port}`));