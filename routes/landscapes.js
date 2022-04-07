/* const landscapeRoutes = (app, fs) => {
    // variables
    const dataPath = './data.json';
  
    // READ
    app.get('/landscapes', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });
  }; */

  const landscapeRoutes = (app, fs) => {
    //...unchanged ^^^
    //oklart om den ska sta med
    const dataPath = './data.json';
  
    // refactored helper methods
    const readFile = (
      callback,
      returnJson = false,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          throw err;
        }
  
        callback(returnJson ? JSON.parse(data) : data);
      });
    };

    // CREATE
    app.post('/landscapes', (req, res) => {
    readFile(data => {
      // Note: this needs to be more robust for production use. 
      // e.g. use a UUID or some kind of GUID for a unique ID value.
      //oklart vad som ska sta bakom =
      const newLandscape = [];
  
      // add the new landscape
      data[newLandscape] = req.body;
  
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send('new landscape added');
      });
    }, true);
  });

  app.put('/landscapes/:id', (req, res) => {
    readFile(data => {
      // add the new landscape
      const landscapeId = req.params['id'];
      data[landscapeId] = req.body;
  
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`landscapes id:${userId} updated`);
      });
    }, true);
  });

  // DELETE
app.delete('/landscapes/:id', (req, res) => {
    readFile(data => {
      // add the new landscape
      const landscapeId = req.params['id'];
      delete data[landscapeId];
  
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`users id:${landscapeId} removed`);
      });
    }, true);
  });

  
    const writeFile = (
      fileData,
      callback,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.writeFile(filePath, fileData, encoding, err => {
        if (err) {
          throw err;
        }
  
        callback();
      });
    };
  
    // READ
    // Notice how we can make this 'read' operation much more simple now.
    app.get('/landscapes', (req, res) => {
      readFile(data => {
        res.send(data);
      }, true);
    });
  };
  
  module.exports = landscapeRoutes;