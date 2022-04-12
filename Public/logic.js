//Had to make this div global due to that I had to 
//empty it everytime the getLandscapes() is called
const landscapeHolder = document.createElement("div");

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

async function getSpecificLandscape () {
  try {
    const response = await fetch("/api/landscapes");
    const result = await response.json();
    console.log(result);
    showLandscapes(result);
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

async function editData(id) {
 const response = await fetch(`/api/landscapes/${id}`, {
    method: "PUT",
  /*   body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    }, */
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

/* 
method: "POST",
body: JSON.Stringify({}),
headers: {
  "Content-Type": "application/json"
} */

function showLandscapes(landscapes) {
  const landscapeContainer = document.getElementById("container");
  landscapeContainer.appendChild(landscapeHolder);

  for (let landscape of landscapes) {
    landscapeHolder.style.display = "initial";
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

document.getElementById("submit-btn").addEventListener("click", (event) => {
  event.preventDefault();
  postLandscape();
});

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

function editLandscape(landscape, landscapes){
  const input = document.querySelectorAll("input");
  const inputName = input[0];
  const inputFlower = input[1];
  const inputAnimal = input[2];
  
  inputName.placeholder = landscape.name
  inputFlower.placeholder = landscape.flower
  inputAnimal.placeholder = landscape.animal

  let editedName = "";
  const editedFlower = input[1];
  const editedAnimal = input[2];

  editName = input[0]
  
  const name = editedName.value;
  const flower = editedFlower.value;
  const animal = editedAnimal.value;
  console.log(editedName.value)
  
  const data = { name, flower, animal };
  console.log(data)

  document.getElementById('edit-btn').addEventListener("click", (event) => {
    event.preventDefault()
    editData(data)
    console.log('click')
    console.log(data)
  })
  console.log(data)

 /*  editSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    //editData(data)
    console.log('clickclick')
  })
  console.log(landscape, landscapes)*/
} 

function deleteLandscape(landscape, landscapes) {
  landscapes.splice(landscape, 1);
  deleteData(landscape.id);
  console.log(landscape.id)
}
