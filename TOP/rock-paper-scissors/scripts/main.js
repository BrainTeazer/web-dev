const options = ["ROCK", "PAPER", "SCISSORS"];

function computerPlay() {
  return options[Math.floor(Math.random() * options.length)];
}

function playRound(playerSelection, computerSelection) {
  switch (true) {
    case playerSelection === computerSelection:
      return `Draw! Both players chose ${playerSelection}`;
      break;

    case playerSelection === "ROCK" && computerSelection == "PAPER":
    case playerSelection === "SCISSORS" && computerSelection == "ROCK":
    case playerSelection === "PAPER" && computerSelection == "SCISSORS":
      return `You Lose! ${computerSelection} beats ${playerSelection}`;
      break;

    case playerSelection === "PAPER" && computerSelection == "ROCK":
    case playerSelection === "ROCK" && computerSelection == "SCISSORS":
    case playerSelection === "SCISSORS" && computerSelection == "PAPER":
      return `You Win! ${playerSelection} beats ${computerSelection}`;
      break;

    default:
      return "invalid";
  }
}

function game(numberOfGames = 5) {
  let playerScore = 0;
  let computerScore = 0;
  let numberOfDraw = 0;
  let invalidGames = 0;

  for (i = 0; i < numberOfGames + invalidGames; i++) {
    playerSelection = prompt("Choose: Rock, Paper or Scissors (case-insensitive)").toUpperCase();
    computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);
    if (playRound(playerSelection, computerSelection).indexOf("Win") > -1) {
      playerScore += 1;
    } else if (playRound(playerSelection, computerSelection).indexOf("Lose") > -1) {
      computerScore += 1;
    } else if (playRound(playerSelection, computerSelection).indexOf("Draw") > -1) {
      numberOfDraw += 1;
    } else {
      invalidGames += 1;
      console.log("Invalid. Please try again.");
    }
  }

  if (playerScore > computerScore) {
    alert(`Player wins! \nPlayer points: ${playerScore} \nComputer Points: ${computerScore}\nNumber of drawn games: ${numberOfDraw}`);
  } else if (playerScore < computerScore) {
    alert(`Player Loses! \nPlayer points: ${playerScore} \nComputer Points: ${computerScore}\nNumber of drawn games ${numberOfDraw}`);
  } else {
    alert(`Draw! \nBoth player and computer got ${playerScore} points.\nNumber of drawn games: ${numberOfDraw}`);
  }
}
