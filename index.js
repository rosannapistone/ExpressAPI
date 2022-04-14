import express from "express";
import fs from "fs";

const app = express();
const port = 3000;


function renderLandscapes() {
  let data = fs.readFileSync("./data.json");
  let object = JSON.parse(data);
  return object;
}

//id generator, is called when new data creates
const generateId = () => {
  let getRandomID = Math.random() * 100;
  return getRandomID;
};

function saveLandscapes(landscapeList) {
  fs.writeFile("./data.json", JSON.stringify(landscapeList, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function isLandscapeAdded() {
  let addedLandscapes = renderLandscapes();
  let addedLandscape = addedLandscapes.find((item) => {
    return item.id;
  });
  if (addedLandscape) {
    return addedLandscape;
  } else return false;
}

app.use("/", express.static("public"));
app.use(express.json());

app.get("/api/landscapes", (req, res) => {
  res.send(renderLandscapes());
});

//get specific landscape
app.get("/api/landscapes/:id", (req, res) => {

  let landscapeList = renderLandscapes()
    const foundLandscape = landscapeList.find((landscape) => {
      console.log('list', landscapeList)
        if (landscape.id === +req.params.id) {
            return true
        }  else {
          res.status(404).send("No landscapes found")
            return false
        } 
    })
    res.send(foundLandscape)
});


app.post("/api/landscapes", (req, res) => {
  let landscapeList = renderLandscapes();
  console.log("landscapeList", landscapeList);
  const newLandscape = req.body;
  const newLandscapeId = { ...newLandscape, id: generateId() };
  landscapeList.push(newLandscapeId);
  saveLandscapes(landscapeList);
  res.send("New landscape is posted");
});

app.put("/api/landscapes/:id", (req, res) => {
  const { id } = req.params;
  if (!isLandscapeAdded(id)) {
    res.status(404).send("No landscape matches this call");
    return;
  }
  let updatedLandscapeList = renderLandscapes().map((item) => {
    if (item.id == id) {
      return req.body;
    }
    return item;
  });
  saveLandscapes(updatedLandscapeList);
  res.status(200).send(`landscape with id:${id} is updated`);
});

app.delete("/api/landscapes/:id", (req, res) => {
  const { id } = req.params;
  if (!isLandscapeAdded(id)) {
    res.status(404).send("Landscape does not exist");
  }
  let landscapeList = renderLandscapes();
  let removeLandscape = landscapeList.find((item) => item.id == id);
  let updatedLandscapeList = landscapeList.filter((item) => item.id != id);
  saveLandscapes(updatedLandscapeList);
  res.send("Landscape deleted");
});

app.listen(port, () => console.log(`app is running on port: ${port}`));
