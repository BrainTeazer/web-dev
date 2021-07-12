const body = document.querySelector("body");

const redPara = document.createElement("p");
redPara.textContent = "Hey I'm red!";
redPara.setAttribute("style", "color:red");
body.appendChild(redPara);

const blueHead = document.createElement("h3");
blueHead.textContent = "I'm a blue h3";
blueHead.setAttribute("style", "color:blue");
body.appendChild(blueHead);

const div = document.createElement("div");
div.setAttribute("style", "background-color:pink; border: 1px solid black");

const h1 = document.createElement("h1");
const para = document.createElement("p");

h1.textContent = "I'm in a div";
para.textContent = "ME TOO!";

div.appendChild(h1);
div.appendChild(para);

body.appendChild(div);

const btn = document.querySelectorAll("button");

btn.forEach((btns) => {
  btns.addEventListener("click", () => {
    console.log(btns.id);
  });
});
