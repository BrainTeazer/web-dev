let containerDiv = document.createElement("div");
containerDiv.className = "container";
document.body.appendChild(containerDiv);

const pickColour = document.querySelector("#color-picker");
pickColour.addEventListener("change", colorPick); //when clicking on colour wheel chooses (gets) the colour without closing the colour wheel window
let allOptions = document.querySelectorAll(".option");
let fillBtn = document.getElementById("fill");
let darkenBtn = document.getElementById("darken");
let lightenBtn = document.getElementById("lighten");

let fill = false;
let darken = false;
let lighten = false;
let colorPicker = true;
let boxesPerSide = 32; //default 32x32 grid

//Prevents dragging of container.
containerDiv.ondragstart = () => {
  return false;
};

function colorPick(e) {
  let newColour = e.target.value;
  colorPicker = true;
  return newColour;
}

//removes the 'selected' class from all buttons with 'option' class
function removeSelectClass() {
  allOptions.forEach((anOption) => {
    document.querySelector("#label").classList.remove("selected");

    for (i = 0; i < allOptions.length; i++) {
      allOptions[i].classList.remove("selected");
    }
  });
}

fillBtn.addEventListener("click", (e) => {
  if (!fill) {
    fill = true;
    darken = false;
    lighten = false;
    fillBtn.classList.add("selected");
    lightenBtn.classList.remove("selected");
    darkenBtn.classList.remove("selected");
  } else {
    fill = false;
    fillBtn.classList.remove("selected");
  }
});

darkenBtn.addEventListener("click", (e) => {
  if (!darken) {
    darken = true;
    lighten = false;
    fill = false;
    rainbow = false;
    eraser = false;
    colorPicker = false;
    darkenBtn.classList.add("selected");
    lightenBtn.classList.remove("selected");
    fillBtn.classList.remove("selected");
    removeSelectClass();
  } else {
    darken = false;
    darkenBtn.classList.remove("selected");
  }
});

lightenBtn.addEventListener("click", (e) => {
  if (!lighten) {
    lighten = true;
    darken = false;
    fill = false;
    rainbow = false;
    eraser = false;
    colorPicker = false;
    lightenBtn.classList.add("selected");
    darkenBtn.classList.remove("selected");
    fillBtn.classList.remove("selected");
    removeSelectClass();
  } else {
    lighten = false;
    lightenBtn.classList.remove("selected");
  }
});

const randomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

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
            containerDiv.children[i].style.backgroundColor = randomColor();
          }
          break;
        default:
          for (i = 0; i < containerDiv.children.length; i++) {
            containerDiv.children[i].style.backgroundColor = `${pickColour.value}`;
          }
      }
    } else {
      if (darken || lighten) {
        console.log(e.target.style.backgroundColor);
        if (e.target.style.backgroundColor.slice(0, 3) === "rgb") {
          let rValue = Number(e.target.style.backgroundColor.split(/[(),]+/)[1].trim());
          let gValue = Number(e.target.style.backgroundColor.split(/[(),]+/)[2].trim());
          let bValue = Number(e.target.style.backgroundColor.split(/[(),]+/)[3].trim());
          if (darken && rValue < 10) {
            rValue = 0;
          } else if (lighten && rValue > 245) {
            rValue = 255;
          } else if (darken && gValue < 10) {
            gValue = 0;
          } else if (lighten && gValue > 245) {
            gValue = 255;
          } else if (darken && bValue < 10) {
            bValue = 0;
          } else if (lighten && bValue > 245) {
            bValue = 255;
          }
          if (darken) {
            e.target.style.backgroundColor = `rgb(${(rValue -= 10)}, ${(gValue -= 10)}, ${(bValue -= 10)})`; //if darken decrease rgb value by 10
          } else if (lighten) {
            e.target.style.backgroundColor = `rgb(${(rValue += 10)}, ${(gValue += 10)}, ${(bValue += 10)})`; //if brighten increase rgb value by 10
          }
        }
      } else {
        switch (true) {
          case colorPicker === true:
            e.target.style.backgroundColor = `${pickColour.value}`;
            break;
          case eraser === true:
            e.target.style.backgroundColor = "";
            break;
          case rainbow === true:
            e.target.style.backgroundColor = randomColor();
            break;
          default:
            e.target.style.backgroundColor = `${pickColour.value}`;
        }
      }
    }
  }
}

function gridOfSquares() {
  containerDiv.innerHTML = "";
  containerDiv.setAttribute("style", `display: grid; grid-template-columns: repeat(${boxesPerSide}, 1fr); border: 3px solid black`); //styling grids to be square
  for (i = 1; i <= boxesPerSide ** 2; i++) {
    let box = document.createElement("div");
    box.className = "box";
    containerDiv.appendChild(box);
  }

  let allBoxes = document.querySelectorAll(".box");
  for (i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener("mousedown", drawClickHover);
    allBoxes[i].addEventListener("mouseover", drawClickHover); // on click and drag recolour grid
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

let clearAll = document.querySelector("#clearAll").addEventListener("click", () => {
  let allBoxes = document.querySelectorAll(".box");
  allBoxes.forEach((box) => {
    box.style.backgroundColor = "";
  });
});

allOptions.forEach((anOption) => {
  anOption.addEventListener("click", (e) => {
    darkenBtn.classList.remove("selected");
    darken = false;
    lightenBtn.classList.remove("selected");
    lighten = false;
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
        //default is "color-picker"
        rainbow = false;
        eraser = false;
        colorPicker = true;
    }
  });
});
