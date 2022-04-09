/* window.onload = ("load", main);

function main() {
  getLandscapes();
} */

document.getElementById('get-btn').addEventListener('click', (event) => {
    let landscapes = getLandscapes()
    console.log(landscapes)
}) 

async function getLandscapes() {
  try {
    const response = await fetch("/api/landscapes"); //1 - req.params
    const result = await response.json();
    console.log(result);
    showLandscapes(result);
    //postLandscape(result)
  } catch (err) {
    console.log(err);
  }
} 

async function postNewData (data) {
  const response = await fetch("/api/landscapes", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

}

/* 
method: "POST",
body: JSON.Stringify({}),
headers: {
  "Content-Type": "application/json"
} */


function showLandscapes(landscapes) {
  const landscapeContainer = document.getElementById("container");
  for (let landscape of landscapes) {
    const landscapeContent = document.createElement("div");
    landscapeContent.setAttribute("id", "landscape-content");
    landscapeContainer.appendChild(landscapeContent);
    
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

    const editDiv = document.createElement('div')
    editDiv.setAttribute("id", "edit-div")
    landscapeContainer.appendChild(editDiv)

    const deleteIcon = document.createElement("a");
    deleteIcon.setAttribute("id", "delete-icon")
    //deleteIcon.style.width = "2%"
    deleteIcon.innerHTML='Ta bort'
    editDiv.appendChild(deleteIcon);
    
    const editIcon = document.createElement("a");
    editIcon.setAttribute("id", "edit-icon")
    //editIcon.style.width = "2%"
    editIcon.innerHTML='Ändra'
    editDiv.appendChild(editIcon);
  }
}

/* const form = document.getElementById('form');
console.log(form) */

document.getElementById('submit-btn').addEventListener('click', (event) => {
  event.preventDefault();
  /* let postNewLandscape =  */
  postLandscape()
  //console.log(postNewLandscape)
}) 



function postLandscape() {
const input = document.querySelectorAll('input')
const inputName = input[0]
const inputFlower = input[1]
const inputAnimal = input[2]

//landscapes.name = input[0].value

const name = inputName.value 
const flower = inputFlower.value
const animal = inputAnimal.value

const data = {name, flower, animal};

console.log(data)

postNewData(data)
/* form.children[1] */
//console.log(lname, flower, animal)
//console.log(data)
}
