window.onload = ('load', main)

function main() {
    getLandscapes();
}

async function getLandscapes() {
  try {
    const response = await fetch("api/landscapes");
    const result = await response.json();
    showLandscapes(result);
    console.log(response, result)
} catch (err) {
    console.log(err);
    }
}



function showLandscapes(landscapes) {
    const landscapeContainer = document.getElementById('container');
for (let landscape of landscapes) {
    const landscapeContent = document.createElement('div');
    landscapeContent.innerText = landscape.name
    landscapeContainer.appendChild(landscapeContent);
    console.log(landscape.id)
    
}
};
