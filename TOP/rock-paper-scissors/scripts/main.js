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
      console.log("Draw");
      return "draw";
      break;

    case playerSelection === "ROCK" && computerSelection == "PAPER":
    case playerSelection === "SCISSORS" && computerSelection == "ROCK":
    case playerSelection === "PAPER" && computerSelection == "SCISSORS":
      console.log("Lose");
      return "lose";
      break;

    case playerSelection === "PAPER" && computerSelection == "ROCK":
    case playerSelection === "ROCK" && computerSelection == "SCISSORS":
    case playerSelection === "SCISSORS" && computerSelection == "PAPER":
      console.log("Win");
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
const results = document.createElement("div");
const history = document.createElement("div");
const currentScore = document.createElement("h2");

results.id = "results";

results.appendChild(currentScore);
body.appendChild(results);

function game() {
  if (numberOfDraw === 0 && playerScore === 0 && computerScore === 0) {
    history.innerHTML = "";
  }
  currentScore.id = "test";
  const result = document.createElement("p");
  history.id = "history";
  result.id = "result";
  computerSelection = computerPlay();
  playRound(playerSelection, computerSelection);
  if (playRound(playerSelection, computerSelection) === "win") {
    result.innerHTML += `The winner of the round is <b>Player</b>. Player chose <em>${playerSelection}</em> and Computer chose <em>${computerSelection}</em>.`;
    playerScore += 1;
  } else if (playRound(playerSelection, computerSelection) === "lose") {
    result.innerHTML += `The winner of the round is <b>Computer</b>. Player chose <em>${playerSelection}</em> and Computer chose <em>${computerSelection}</em>.`;
    computerScore += 1;
  } else {
    result.innerHTML += `It's a <b>draw</b>. Both players chose <em>${playerSelection}</em>.`;
    numberOfDraw += 1;
    console.log("draw");
  }
  history.appendChild(result);
  results.appendChild(history);

  currentScore.textContent = `Current score:` + newline + `\nPlayer - ${playerScore} points` + newline + `Computer - ${computerScore} points`;

  if (playerScore === 5 || computerScore === 5) {
    if (playerScore === 5) {
      ("Game over. The winner of the game is Player.");
    } else {
      ("Game over. The winner of the game is Computer.");
    }
    playerScore = 0;
    computerScore = 0;
    numberOfDraw = 0;
  }
}
