/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- ALSO, if the player rolls a double six the player loses their entire score and it is the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, inputScore, winningScore;

//initiates game on page load
init();

//rolls dice and handles functionality associated with value of dice rolls and displays correct dice image.
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Random Number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    //3. Update the score IF the rolled number was NOT 1
    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

//adds functionality for hold button and checks if a player has won the game
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    // update ui
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      winningScore = 100;
    } else {
      nextPlayer();
    }
  }
});

//NextPlayer function resets the current score and toggles which player is active.
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

//allows players to change defalut value of 100 for final score
document.querySelector(".btn-submit").addEventListener("click", function() {
  inputScore = document.getElementById("input-score").value;
  //Undefined, 0, null or "" are CORECED to false
  //Anything else is COERCED to true
  if (inputScore) {
    winningScore = inputScore;
  }
});

//initiates the game on New Game button click or on reload of page
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  previousDice = 0;
  winningScore = 100;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  //reset the input field
  document.querySelector(".score-input").placeholder = "Enter Winning Score";
  document.querySelector(".score-input").value = "";
}
