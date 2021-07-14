// let boxesPerSide;

let containerDiv = document.createElement("div");
let containerDivDimension = 960;
containerDiv.className = "container";
document.body.appendChild(containerDiv);

let heading = document.querySelector("h1");
let size = document.createElement("div");
heading.appendChild(size);

function gridOfSquares(boxesPerSide = 32) {
  containerDiv.innerHTML = "";
  size.textContent = `(Current size: ${boxesPerSide} x ${boxesPerSide})`;
  for (i = 1; i <= boxesPerSide ** 2; i++) {
    containerDiv.setAttribute("style", `display: grid; width: ${containerDivDimension}px; height: ${containerDivDimension}px; grid-template-columns: repeat(${boxesPerSide}, ${containerDivDimension / boxesPerSide}px); border: 3px solid black`);
    let box = document.createElement("div");
    box.className = "box";
    containerDiv.appendChild(box);
  }
}

gridOfSquares();

let allBoxes = document.querySelectorAll(".box");

function blackOption() {
  allBoxes.forEach((box) => {
    box.addEventListener("mouseover", (e) => {
      e.target.setAttribute("style", "background-color: black");
    });
  });
}

function eraser() {
  allBoxes.forEach((box) => {
    box.addEventListener("mouseover", (e) => {
      e.target.setAttribute("style", `background-color:${document.body.style.backgroundColor}`);
    });
  });
}

function rainbow() {
  allBoxes.forEach((box) => {
    box.addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    });
  });
}

// function grayscale() {
//   allBoxes.forEach((box) => {
//     box.addEventListener("mouseover", (e) => {
//       console.log(e.target);
//       e.target.setAttribute("style", `background-color: red; opacity: ${(i += 0.1)}`);
//     });
//   });
// }

blackOption();

let clearAll = document.querySelector("#clearAll").addEventListener("click", () => {
  allBoxes.forEach((box) => {
    box.setAttribute("style", `background-color:${document.body.style.backgroundColor}`);
  });
});

let button = document.querySelector("button");
let buttonStyle = getComputedStyle(button);

let allOptions = document.querySelectorAll(".option");
allOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    for (i = 0; i < allOptions.length; i++) {
      allOptions[i].setAttribute("style", "border: 1px solid black; background-color:white; color: black; font-weight: normal");
    }
    e.target.setAttribute("style", "border: 1px solid black; background-color: rgba(0,0,0,0.7); color: white; font-weight: bold");
    switch (e.target.id) {
      case "black":
        blackOption();
        break;
      case "rainbow":
        rainbow();
        break;
      case "eraser":
        eraser();
        break;
      // case ("grayscale"):
      //   grayscale();
      //   break;
      default:
        blackOption();
    }
  });
});
