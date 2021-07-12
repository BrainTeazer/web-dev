const options = ["ROCK", "PAPER", "SCISSORS"];
let newline = "\r\n";

//Gets random element from options
function computerPlay() {
  return options[Math.floor(Math.random() * options.length)];
}

//Plays one round of rock paper scissors with arguments being playerSelection and computerSelection
function playRound(playerSelection, computerSelection) {
  switch (true) {
    case playerSelection === computerSelection:
      return "draw";
      break;

    case playerSelection === "ROCK" && computerSelection == "PAPER":
    case playerSelection === "SCISSORS" && computerSelection == "ROCK":
    case playerSelection === "PAPER" && computerSelection == "SCISSORS":
      return "lose";
      break;

    case playerSelection === "PAPER" && computerSelection == "ROCK":
    case playerSelection === "ROCK" && computerSelection == "SCISSORS":
    case playerSelection === "SCISSORS" && computerSelection == "PAPER":
      return "win";
      break;

    default:
      return "invalid";
  }
}

const btns = document.querySelectorAll("button");

let playerScore = 0;
let computerScore = 0;
let numberOfDraw = 0;
let count = 0;
let winner;

btns.forEach((button) => {
  button.addEventListener("click", (e) => {
    playerSelection = button.textContent.toUpperCase();
    game();
  });
});

const body = document.querySelector("body");

const information = document.createElement("div");
information.id = "information";

const history = document.createElement("div");

const historyHeading = document.createElement("h4");
historyHeading.textContent = "Per Round Results";

const informationHeading = document.createElement("h3");
informationHeading.textContent = "Game Information";
informationHeading.setAttribute("style", "margin: 0; padding:0");

const currentScore = document.createElement("p");
const gameOptions = document.querySelector("#options");

//Game Over and Play Again elements
const gameOver = document.createElement("div");
gameOver.setAttribute("style", "display: flex; align-self: center; align-items:center; flex-direction: column; margin-bottom: 50px;");

const playAgain = document.createElement("button");
playAgain.textContent = "Play Again";

const winnerAnnouce = document.createElement("p");
winnerAnnouce.setAttribute("style", "color: white; font-size: 1.3em");

body.appendChild(information);

function game() {
  if (numberOfDraw === 0 && playerScore === 0 && computerScore === 0) {
    history.innerHTML = "";
  }
  history.id = "history";

  information.appendChild(informationHeading);

  information.appendChild(currentScore);
  currentScore.id = "currentScore";

  information.appendChild(historyHeading);

  const result = document.createElement("p");
  result.id = "result";

  computerSelection = computerPlay();
  playRound(playerSelection, computerSelection);

  if (playRound(playerSelection, computerSelection) === "win") {
    result.innerHTML += `The winner of the round is <b>Player</b>. 
                          Player chose <em>${playerSelection}</em> and 
                          Computer chose <em>${computerSelection}</em>.`;
    playerScore += 1;
  } else if (playRound(playerSelection, computerSelection) === "lose") {
    result.innerHTML += `The winner of the round is <b>Computer</b>. 
                          Player chose <em>${playerSelection}</em> and 
                          Computer chose <em>${computerSelection}</em>.`;
    computerScore += 1;
  } else {
    result.innerHTML += `It's a <b>draw</b>. 
                          Both players chose <em>${playerSelection}</em>.`;
    numberOfDraw += 1;
  }

  history.appendChild(result);
  information.appendChild(history);
  history.scrollTop = history.scrollHeight;

  currentScore.textContent = `Current score:` + newline + `\nPlayer - ${playerScore} points` + newline + `Computer - ${computerScore} points`;

  if (playerScore === 5 || computerScore === 5) {
    if (playerScore === 5) {
      winnerAnnouce.textContent = "Game over. The winner of the game is Player.";
    } else {
      winnerAnnouce.textContent = "Game over. The winner of the game is Computer.";
    }
    playerScore = 0;
    computerScore = 0;
    numberOfDraw = 0;
    gameOver.appendChild(winnerAnnouce);
    gameOver.appendChild(playAgain);
    body.insertBefore(gameOver, body.children[2]);
    gameOptions.style.display = "none";
  }
}

playAgain.addEventListener("click", () => {
  information.innerHTML = "";
  gameOver.innerHTML = "";
  gameOptions.style.removeProperty("display");
});
