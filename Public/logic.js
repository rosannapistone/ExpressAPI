//Had to make this div global due to that I had to
//empty it everytime the getLandscapes() is called
const landscapeHolder = document.createElement("div");

//Gets all data to be ready for the search function
getSpecificLandscape();

document.getElementById("get-btn").addEventListener("click", (event) => {
  let landscapes = getLandscapes();
  console.log(landscapes);
});

//Fetches data, GET
async function getLandscapes() {
  landscapeHolder.innerHTML = "";
  try {
    const response = await fetch("/api/landscapes");
    const result = await response.json();
    console.log(result);
    showLandscapes(result);
  } catch (err) {
    console.log(err);
  }
}

//Fetches data, GET
async function getSpecificLandscape() {
  try {
    const response = await fetch("/api/landscapes");
    const result = await response.json();
    console.log(result);
    getSpecLandscape(result);
  } catch (err) {
    console.log(err);
  }
}

//POST
async function postNewData(data) {
  const response = await fetch("/api/landscapes", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  setTimeout(function () {
    getLandscapes();
  }, 1500);
}

//PUT
async function editData(data, id) {
  const response = await fetch(`/api/landscapes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  setTimeout(function () {
    getLandscapes();
  }, 1500);
}

//DELETE
async function deleteData(id) {
  const response = await fetch(`/api/landscapes/${id}`, {
    method: "DELETE",
  });
  setTimeout(function () {
    getLandscapes();
  }, 1500);
}

//Creates HTML-element for each landscape from the database
//to display them in the UI
function showLandscapes(landscapes) {
  const landscapeContainer = document.getElementById("container");
  landscapeContainer.appendChild(landscapeHolder);

  for (let landscape of landscapes) {
    const landscapeContent = document.createElement("div");
    landscapeContent.setAttribute("id", "landscape-content");
    landscapeHolder.appendChild(landscapeContent);
    const name = document.createElement("p");
    name.innerText = landscape.name;
    name.style.width = "36%";
    landscapeContent.appendChild(name);

    const flower = document.createElement("p");
    flower.innerText = landscape.flower;
    flower.style.width = "32%";
    landscapeContent.appendChild(flower);

    const animal = document.createElement("p");
    animal.innerText = landscape.animal;
    animal.style.width = "32%";
    landscapeContent.appendChild(animal);

    const editDiv = document.createElement("div");
    editDiv.setAttribute("id", "edit-div");
    landscapeHolder.appendChild(editDiv);

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.innerHTML = "Ta bort";
    editDiv.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
      deleteLandscape(landscape, landscapes);
    });

    const editButton = document.createElement("button");
    editButton.setAttribute("id", "edit-button");
    editButton.innerHTML = "Ändra";
    editDiv.appendChild(editButton);
    editButton.addEventListener("click", function () {
      editLandscape(landscape, landscapes);
    });
  }
}

//searches for unique data from the db
function getSpecLandscape(landscapes) {
  const searchResult = document.getElementById("search-result");
  const noRes = document.createElement("div");
  searchResult.appendChild(noRes);
  const noResult = document.createElement("p");
  const resultDiv = document.createElement("div");
  const result = document.createElement("p");
  const namn = document.createElement("p");
  const blomma = document.createElement("p");
  const djur = document.createElement("p");

  const input = document.querySelectorAll("input");
  const inputName = input[3];
  const inputFlower = input[4];
  const inputAnimal = input[5];

  document.getElementById("search-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const name = inputName.value;
    const flower = inputFlower.value;
    const animal = inputAnimal.value;

    for (let landscape of landscapes) {
      if (
        landscape.name === name ||
        landscape.flower === flower ||
        landscape.animal === animal
      ) {
        searchResult.appendChild(resultDiv);
        resultDiv.setAttribute("id", "result-div");

        resultDiv.appendChild(result);
        result.innerHTML = "Sökresultat:";
        result.style.color = "blue";

        resultDiv.appendChild(namn);
        namn.innerHTML = landscape.name;

        resultDiv.appendChild(blomma);
        blomma.innerHTML = landscape.flower;

        resultDiv.appendChild(djur);
        djur.innerHTML = landscape.animal;

        noResult.innerHTML = "";
      }
    }
  });
}

//button calls the following function
document.getElementById("submit-btn").addEventListener("click", (event) => {
  event.preventDefault();
  postLandscape();
});

//handles the user input and sends it to the POST function
function postLandscape() {
  const input = document.querySelectorAll("input");
  const inputName = input[0];
  const inputFlower = input[1];
  const inputAnimal = input[2];

  const name = inputName.value;
  const flower = inputFlower.value;
  const animal = inputAnimal.value;

  const data = { name, flower, animal };

  postNewData(data);
}

//triggers from button 'click' in the UI,
//all the changes are sent to the PUT function
function editLandscape(landscape, landscapes) {
  const input = document.querySelectorAll("input");
  const inputName = input[6];
  const inputFlower = input[7];
  const inputAnimal = input[8];

  inputName.placeholder = landscape.name;
  inputFlower.placeholder = landscape.flower;
  inputAnimal.placeholder = landscape.animal;

  document.getElementById("edit-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const name = inputName.value;
    const flower = inputFlower.value;
    const animal = inputAnimal.value;
    const id = landscape.id;

    const data = { name, flower, animal, id };

    editData(data, landscape.id);
  });
}

//deletes the targeted landscape on button 'click' from the UI,
//the item id is sent to the DELETE function
function deleteLandscape(landscape, landscapes) {
  landscapes.splice(landscape, 1);
  deleteData(landscape.id);
  console.log(landscape.id);
}
