import express from "express";
import fs, { readFile, readFileSync, writeFile } from "fs";

const app = express();
const port = 3000;

//Functions
function renderLandscapes() {
  let data = fs.readFileSync("./data.json");
  let object = JSON.parse(data);
  console.log("object", object);
  return object;
}

const generateId = () => {
  let numb = 1;
  let getRandomID = Math.random() * numb;
  let takenIds = [1];
  while (takenIds.includes(getRandomID)) {
    takenIds.push(getRandomID);
  }
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

app.post("/api/landscapes", (req, res) => {
  let landscapeList = renderLandscapes();
  console.log("landscapeList", landscapeList);
  const newLandscape = req.body;
  const newLandscapeId = { ...newLandscape, id: generateId() };
  landscapeList.push(newLandscapeId);
  saveLandscapes(landscapeList);
  res.send("uppdated");
});

app.put("/api/landscapes/:id", (req, res) => {
  const { id } = req.params;
  if (!isLandscapeAdded(id)) {
    res.send("Landskapet finns ej");
    return;
  }
  let updatedLandscapeList = renderLandscapes().map((item) => {
    if (item.id == id) {
      return req.body;
    }
    return item;
  });
  saveLandscapes(updatedLandscapeList);
  res.status(200).send(`landscapes id: updated`);
});

app.delete("/api/landscapes/:id", (req, res) => {
  const { id } = req.params;
  if (!isLandscapeAdded(id)) {
    res.send("Landskapet finns ej");
  }
  let landscapeList = renderLandscapes();
  let removeLandscape = landscapeList.find((item) => item.id == id);
  let updatedLandscapeList = landscapeList.filter((item) => item.id != id);
  saveLandscapes(updatedLandscapeList);
  res.send("landskap borttaget");
});

app.listen(port, () => console.log(`app is running on port: ${port}`));
