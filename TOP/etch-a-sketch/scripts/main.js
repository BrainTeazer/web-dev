let containerDiv = document.createElement("div");
containerDiv.className = "container";
document.body.appendChild(containerDiv);

const pickColour = document.querySelector("#color-picker");
pickColour.addEventListener("change", colorPick);
let allOptions = document.querySelectorAll(".option");
let fillBtn = document.getElementById("fill");
let darkenBtn = document.getElementById("darken");

let fill = false;
let darken = false;
let colorPicker = true;
let boxesPerSide = 32;

//Prevents dragging of container.
containerDiv.ondragstart = () => {
  return false;
};

fillBtn.addEventListener("click", (e) => {
  if (!fill) {
    fill = true;
    fillBtn.classList.add("selected");
  } else {
    fill = false;
    fillBtn.classList.remove("selected");
  }
});

darkenBtn.addEventListener("click", (e) => {
  if (!darken) {
    darken = true;
    darkenBtn.classList.add("selected");
  } else {
    darken = false;
    darkenBtn.classList.remove("selected");
  }
});

function hextorgba(hex) {
  let match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) {
    return null;
  } else {
    return `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`;
  }
}

let bg = 0;

function drawClickHover(e) {
  //checks if a button is being pressed
  if (e.buttons > 0) {
    if (fill) {
      switch (true) {
        case colorPicker === true:
          for (i = 0; i < containerDiv.children.length; i++) {
            containerDiv.children[i].style.backgroundColor = `${pickColour.value}`;
          }
          break;
        case eraser === true:
          for (i = 0; i < containerDiv.children.length; i++) {
            containerDiv.children[i].style.backgroundColor = "";
          }
          break;
        case rainbow === true:
          for (i = 0; i < containerDiv.children.length; i++) {
            containerDiv.children[i].style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
          }
          break;
        default:
          for (i = 0; i < containerDiv.children.length; i++) {
            containerDiv.children[i].style.backgroundColor = `${pickColour.value}`;
          }
      }
    } else {
      switch (true) {
        case colorPicker === true:
          if (darken) {
            if (e.target.style.backgroundColor.slice(0, 4) === "rgba") {
              let opacity = Number(e.target.style.backgroundColor.slice(-4, -1));
              e.target.style.backgroundColor = `rgba(${hextorgba(pickColour.value)}, ${(opacity += 0.1)})`;
            } else {
              e.target.style.backgroundColor = `rgba(${hextorgba(pickColour.value)}, 0.1)`;
            }
          } else {
            e.target.style.backgroundColor = `${pickColour.value}`;
          }
          break;
        case eraser === true:
          e.target.style.backgroundColor = "";
          break;
        case rainbow === true:
          e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
          console.log(e.target.style.backgroundColor);
          break;
        default:
          e.target.style.backgroundColor = `${pickColour.value}`;
      }
    }
  }
}

function gridOfSquares() {
  containerDiv.innerHTML = "";
  containerDiv.setAttribute("style", `display: grid; grid-template-columns: repeat(${boxesPerSide}, 1fr); border: 3px solid black`);

  for (i = 1; i <= boxesPerSide ** 2; i++) {
    let box = document.createElement("div");
    box.className = "box";
    containerDiv.appendChild(box);
  }

  let allBoxes = document.querySelectorAll(".box");
  for (i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener("mousedown", drawClickHover);
    allBoxes[i].addEventListener("mouseover", drawClickHover);
  }
}

gridOfSquares();

function userChoice() {
  let newSize = prompt("enter a value:");

  if (!newSize) {
    return;
  }

  while (newSize < 1 || newSize > 64) {
    newSize = prompt("invalid");
  }

  boxesPerSide = parseInt(newSize);
  gridOfSquares();
}

document.getElementById("size").addEventListener("click", userChoice);

let allBoxes = document.querySelectorAll(".box");

let clearAll = document.querySelector("#clearAll").addEventListener("click", () => {
  allBoxes.forEach((box) => {
    box.style.backgroundColor = "";
  });
});

allOptions.forEach((anOption) => {
  anOption.addEventListener("click", (e) => {
    document.querySelector("#label").classList.remove("selected");

    for (i = 0; i < allOptions.length; i++) {
      allOptions[i].classList.remove("selected");
    }

    e.target.classList.add("selected");

    switch (e.target.id) {
      case "color-picker":
        document.querySelector("#label").classList.add("selected");
        colorPicker = true;
        rainbow = false;
        eraser = false;
        break;

      case "rainbow-btn":
        rainbow = true;
        eraser = false;
        colorPicker = false;
        break;

      case "eraser-btn":
        rainbow = false;
        eraser = true;
        colorPicker = false;
        break;

      default:
        rainbow = false;
        eraser = false;
        colorPicker = true;
    }
  });
});

function colorPick(e) {
  let newColour = e.target.value;
  colorPicker = true;
  return newColour;
}
