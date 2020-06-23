/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

//Query Selects takes the first occurence. Aletrnative way for get Element by Id
// document.querySelector("#current-" + activePlayer).textContent = this.dice;

document.querySelector(".btn-roll").addEventListener("click", function () {
  //TODO: 1. Create a Random number
  if (gamePlaying == true) {
    // We need numbers from 1-6. random will give decimal calue between 0-9.
    // Since we need 1-6 (max is 6), so we need to multiply with 6. Result will be 0-5. And we need to add 1 to get b/w 1-6
    var dice = Math.floor(Math.random() * 6) + 1;

    //TODO:2. Display result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    // TODO:3. Update round score IF the roll number is NOT 1.

    if (dice !== 1) {
      // TODO: Add Score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + roundScore + "</em>";
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //TODO: Add current Score to global Scrore
    scores[activePlayer] += roundScore;

    //TODO: Update the UI

    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    //TODO: Check if player won the game

    if (scores[activePlayer] >= 10) {
      winner();
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  //TODO: Next Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

function winner() {
  document.querySelector("#name-" + activePlayer).textContent = "Winner";
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
  document.querySelector(".dice").style.display = "none";
  gamePlaying = false;
}

function init() {
  console.log("Init");
  gamePlaying = true;

  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player-1";
  document.getElementById("name-1").textContent = "Player-2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
}
