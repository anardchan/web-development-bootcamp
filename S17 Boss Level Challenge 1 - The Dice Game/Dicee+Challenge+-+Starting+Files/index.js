var diceImages = ["images/dice1.png", "images/dice2.png", "images/dice3.png", "images/dice4.png", "images/dice5.png", "images/dice6.png"];

var player1Image = document.querySelector("img.img1");
var player2Image = document.querySelector("img.img2");

var player1RandomNumber = Math.floor(Math.random() * 6);
var player2RandomNumber = Math.floor(Math.random() * 6);

player1Image.setAttribute("src", diceImages[player1RandomNumber]);
player2Image.setAttribute("src", diceImages[player2RandomNumber]);

if (player1RandomNumber > player2RandomNumber) {
  document.querySelector("h1").textContent = "Player 1 Wins!";
} else if (player1RandomNumber < player2RandomNumber) {
  document.querySelector("h1").textContent = "Player 2 Wins!";
} else {
  document.querySelector("h1").textContent = "It's a Draw!";
}