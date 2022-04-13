//Had to make this div global due to that I had to
//empty it everytime the getLandscapes() is called
const landscapeHolder = document.createElement("div");

getSpecificLandscape()

document.getElementById("get-btn").addEventListener("click", (event) => {
  let landscapes = getLandscapes();
  console.log(landscapes);
});

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
    //landscapeHolder.style.display = "initial";
    const landscapeContent = document.createElement("div");
    landscapeContent.setAttribute("id", "landscape-content");
    landscapeHolder.appendChild(landscapeContent);
    const name = document.createElement("p");
    name.innerText = landscape.name;
    name.style.width = "40%";
    landscapeContent.appendChild(name);

    const flower = document.createElement("p");
    flower.innerText = landscape.flower;
    flower.style.width = "30%";
    landscapeContent.appendChild(flower);

    const animal = document.createElement("p");
    animal.innerText = landscape.animal;
    animal.style.width = "30%";
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


function getSpecLandscape (landscapes) {
  const searchResult = document.getElementById('search-result')

  const input = document.querySelectorAll("input");
  const inputName = input[3];
  const inputFlower = input[4];
  const inputAnimal = input[5];

  document.getElementById("search-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const name = inputName.value;
    const flower = inputFlower.value;
    const animal = inputAnimal.value;

    landscapes.map(landscape => {
      if (landscape.name === name || landscape.flower === flower || landscape.animal === animal)
      {
        const resultDiv = document.createElement('div')
        searchResult.appendChild(resultDiv)
        resultDiv.setAttribute("id", "result-div");
        const result = document.createElement('p')
        resultDiv.appendChild(result)
        result.innerHTML = 'Sökresultat:'
        result.style.color = "blue"
        const namn = document.createElement('p')
        resultDiv.appendChild(namn)
        namn.innerHTML = landscape.name
        const blomma = document.createElement('p')
        resultDiv.appendChild(blomma)
        blomma.innerHTML = landscape.flower
        const djur = document.createElement('p')
        resultDiv.appendChild(djur)
        djur.innerHTML = landscape.animal
      }
    })
   /*  landscapes.map(landscape => {
    if (landscape.name !== name || landscape.flower !== flower || landscape.animal !== animal){
      const noResult = document.createElement("p")
      searchResult.appendChild(noResult)
      noResult.innerHTML = ('inget')
    }
  }); */
});
}

//button call the following function
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
