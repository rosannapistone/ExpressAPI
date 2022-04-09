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
  } catch (err) {
    console.log(err);
  }
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
    name.style.width = "30%";
    landscapeContent.appendChild(name);

    const flower = document.createElement("p");
    flower.innerText = landscape.flower;
    flower.style.width = "30%";
    landscapeContent.appendChild(flower);

    const animal = document.createElement("p");
    animal.innerText = landscape.animal;
    animal.style.width = "30%";
    landscapeContent.appendChild(animal);

    const deleteIcon = document.createElement("button");
    deleteIcon.setAttribute("id", "delete-icon")
    deleteIcon.style.width = "2%"
    landscapeContent.appendChild(deleteIcon);
  }
}
