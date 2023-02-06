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