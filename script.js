var parentdiv = document.getElementById("parentdiv");
var childdiv = document.getElementsByClassName("item");

//counting the number of elements
var numb = parentdiv.childElementCount;
var div = 360 / numb;

//// calculating the distance of the element's location from the parent
var offsetToParentCenter = parseInt(parentdiv.offsetWidth / 2);
var offsetToChildCenter = 20;
var totalOffset = offsetToParentCenter - offsetToChildCenter;

var middle = numb / 2; //specifying the middle index of the lower element
var radius; // radius will hold the current value

// Updates layout based on resolution change
function updateLayout() {
  radius = calculateRadius();
  updatePositions();
}

// Calculate a new radius based on screen resolution
function calculateRadius() {
  if (window.innerWidth < 992) {
    return 185;
  } else if (window.innerWidth < 1200) {
    return 240;
  } else {
    return 290;
  }
}

// Update element positions based on radius variable
function updatePositions() {
  for (var numb = 0; numb < childdiv.length; ++numb) {
    var y = Math.cos(div * numb * (Math.PI / -180)) * radius;
    var x = Math.sin(div * numb * (Math.PI / -180)) * radius;

    childdiv[numb].style.bottom = y + totalOffset + "px";
    childdiv[numb].style.right = x + totalOffset + "px";
  }

  for (var i = 0; i < childdiv.length; i++) {
    childdiv[i].style.opacity = 0;
  }

  // A function to delay the appearance of li elements
  function showDelayed(index) {
    setTimeout(function () {
      childdiv[index].style.opacity = 1;
    }, index * 300); // Each item will appear with a delay of 300ms
  }

  // Delay the appearance of li items one by one
  for (var i = 0; i < childdiv.length; i++) {
    showDelayed(i);
  }
}

// Initialize the chip and add a listen for resolution change
function initializeLayout() {
  updateLayout();
  window.addEventListener("resize", updateLayout);
}

// Add a class to elements to determine their location
childdiv[0].classList.add("top");
childdiv[Math.floor(middle)].classList.add("bottom");

for (var i = 1; i < middle; i++) {
  childdiv[i].classList.add("right");
}

for (var i = middle + 1; i < childdiv.length; i++) {
  childdiv[i].classList.add("left");
}

// Initialize layout after page load
initializeLayout();
