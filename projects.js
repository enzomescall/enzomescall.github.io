// Project generation stuff
async function fetchDataFromCSV() {
  const response = await fetch('project_list.csv');
  const text = await response.text();

  const projectsData = text.split('\n').map(line => line.split(','));

  // Remove the last element if it is an empty string (caused by a newline at the end of the file)
  if (projectsData[projectsData.length - 1].length === 1 && projectsData[projectsData.length - 1][0] === '') {
    projectsData.pop();
  }

  return projectsData;
}

function createProjectElement(title, description, link, linkdesc, image, date) {
  const projectsContainer = document.getElementById('projects');

  const projectElement = document.createElement('div');
  projectElement.className = 'project';

  projectElement.innerHTML = `
    <div id="project-button-shell">
      <li class="project-button" onMouseOver="alterBackground()" onMouseOut="revertBackground()">
        <a target="_blank" rel="noopener noreferrer" href="${link}">${title}</a>
      </li>
    </div>
    <div id="project-image" onMouseOver="alterBackground()" onMouseOut="revertBackground()">
      <a target="_blank" rel="noopener noreferrer" href="${link}">
        <img src="${image}" alt="${title} Image" draggable="false">
      </a>
    </div>
    <p>${description}</p>
    <li><a id="github-link" target="_blank" rel="noopener noreferrer" href="${link}">"${linkdesc}"</a></li>
    <h3>${date}</h3>
  `;

  projectsContainer.appendChild(projectElement);
}

async function displayProjects() {
  const projectsData = await fetchDataFromCSV();
  projectsData.forEach(([title, description, link, linkdesc, image, date]) => {
    createProjectElement(title, description, link, linkdesc, image, date);
  });
}
  
displayProjects();

const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    }
  });

window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 200)
    setTimeout(function() { 
      document.querySelector('body').style.opacity = 1
    }, 500)  
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})

const background_pattern = document.getElementById('background-pattern');
//const background_image = document.getElementById('projects-background-image');

window.addEventListener('mousemove', mouseCoordinates);

let background_coords = "background-position: 0% 0%;";
function mouseCoordinates(event){
  let x = event.clientX.toString()/window.innerWidth * 100 | 0;
  let y = event.clientY.toString()/window.innerHeight * 100 | 0;
  background_coords = "background-position: " + x + "% " + y + "%;"; 
}

function alterBackground() {
  background_pattern.style.cssText = background_coords
  background_pattern.style.opacity = "0.5";
  background_pattern.style.backgroundSize = "11vmin 11vmin";

  //background_image.style.backgroundSize = "100vmax";
  //background_image.style.opacity = "0.1";
}

function revertBackground() {
  background_pattern.style.backgroundSize = "12vmin 12vmin";
  background_pattern.style.backgroundPosition = "0% 0%;"
  background_pattern.style.opacity = "1";

  //background_image.style.backgroundSize = "105vmax";
  //background_image.style.opacity = "0.15";
}

// scrolling functionality in timeline

const buttonRight = document.getElementById('slideRight');
const buttonLeft = document.getElementById('slideLeft');

buttonRight.onclick = function () {
  document.getElementById('projects').scrollLeft += 800;
};
buttonLeft.onclick = function () {
  document.getElementById('projects').scrollLeft -= 800;
};