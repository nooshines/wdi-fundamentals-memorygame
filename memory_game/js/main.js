let cards = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png"
  },
  {
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png"
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png"
  },
  {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png"
  }
];

let cardsInPlay = [];
let score = 0;
let resetButton = document.getElementById("reset");
let statusMessage = document.getElementById("status-message");
let flipCount = 0;

let createBoard = function() {
  for (let i = 0; i < cards.length; i++) {
    let cardElement = document.createElement("img");
    cardElement.setAttribute("src", "images/back.png");
    cardElement.setAttribute("data-id", i);
    cardElement.addEventListener("click", flipCard);
    document.getElementById("game-board").appendChild(cardElement);
  }
};

let resetGame = function() {
  for (let i = 0; i < cards.length; i++) {
    let cardElement = document.querySelector("img");
    cardElement.remove();
    console.log("removeboard" + i);
  }
  score = -1;
  cardsInPlay.length = 0;
  updateScore();
  createBoard();
  statusMessage.textContent = "GAME RESET. TRY AGAIN!";
  resetButton.style.visibility = "hidden";
  flipCount = 0;
};

let updateScore = function() {
  if (score < 2) {
    score++;
    console.log("Score is " + score);
    document.getElementById("score").textContent = "Score: " + score;
    if (score === 2) {
      statusMessage.textContent = "YOU WIN!";
      resetButton.style.visibility = "visible";
    }
  }
};

let checkForMatch = function() {
  if (cardsInPlay.length === 2) {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      statusMessage.textContent = "MATCH FOUND!";
      cardsInPlay.length = 0;
      updateScore();
    } else {
      statusMessage.textContent = "SORRY, TRY AGAIN!";
      cardsInPlay.length = 0;
      resetButton.style.visibility = "visible";
    }
  }
};

let flipCard = function() {
  if (flipCount > 4) {
    statusMessage.textContent = "STOP CHEATING ..";
  } else {
    let cardId = this.getAttribute("data-id");
    this.setAttribute("src", cards[cardId].cardImage);
    cardsInPlay.push(cards[cardId].rank);
    checkForMatch();
    flipCount++;
  }
};

resetButton.addEventListener("click", resetGame);
createBoard();
