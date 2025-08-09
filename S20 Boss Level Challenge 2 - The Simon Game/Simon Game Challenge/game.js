var gamePattern = []; // Array to hold the sequence of colors
var userClickedPattern = []; // Array to hold the user's clicked colors
var buttonColors = ["red", "blue", "green", "yellow"]; // Array of available colors
var randomNumber; // Variable to hold the randomly generated number
var randomChosenColor; // Variable to hold the chosen color based on the random number

var blueSound = new Audio("./sounds/blue.mp3"); // Sound for blue button
var redSound = new Audio("./sounds/red.mp3"); // Sound for red button
var greenSound = new Audio("./sounds/green.mp3"); // Sound for green button
var yellowSound = new Audio("./sounds/yellow.mp3"); // Sound for yellow button
var wrongSound = new Audio("./sounds/wrong.mp3"); // Sound for wrong button press
const soundsDictionary = {
  red: redSound,
  blue: blueSound,
  green: greenSound,
  yellow: yellowSound,
  wrong: wrongSound
}; // Dictionary of sounds for easy access

var level = 0; // Variable to keep track of the game level

function playSound(name) {
  soundsDictionary[name].currentTime = 0; // Resets the sound to the beginning
  soundsDictionary[name].play(); // Plays the sound associated with the given color
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // Adds the 'pressed' class to the clicked button
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); // Removes the 'pressed' class after a short delay
  }, 100);
}

function nextSequence() {
  level++; // Increments the level
  $("h1").text("Level " + level); // Updates the heading with the current level
  randomNumber = Math.floor(Math.random() * 4); // Generates a random number between 0 and 3
  randomChosenColor = buttonColors[randomNumber]; // Selects a color based on the random number
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // Animates the button corresponding to the chosen color
  playSound(randomChosenColor); // Plays the sound for the chosen color
  gamePattern.push(randomChosenColor); // Adds the chosen color to the game pattern array
}

function startOver() {
  level = 0; // Resets the level to 0
  gamePattern = []; // Resets the game pattern array
  userClickedPattern = []; // Resets the user's clicked pattern array
}

function checkAnswer(){
  if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
    userClickedPattern = []; // Resets the user's clicked pattern if the answer is correct
    setTimeout(function () {
      nextSequence(); // Calls nextSequence after a short delay to continue the game
    }, 1000);
  } else {
    playSound("wrong"); // Plays the wrong sound if the answer is incorrect
    $("body").addClass("game-over"); // Adds a 'game-over' class to the body for visual feedback
    setTimeout(function () {
      $("body").removeClass("game-over"); // Removes the 'game-over' class after a short delay
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart"); // Updates the heading to indicate game over
    startOver(); // Resets the game state
  }
}

$(".btn").on("click", function () {
  if (gamePattern.length === 0) {
    return; // Prevents user input if the game has not started
  }
  var userChosenColor = this.id; // Gets the ID of the clicked button
  userClickedPattern.push(userChosenColor); // Adds the clicked color to the user's pattern array
  animatePress(userChosenColor); // Animates the button press
  playSound(userChosenColor); // Plays the sound for the clicked color
  console.log("User clicked pattern: " + userClickedPattern); // Logs the user's clicked pattern for debugging
  console.log("Game pattern: " + gamePattern); // Logs the current game pattern for debugging
  if (userClickedPattern.length === gamePattern.length) {
    // Checks if the user's pattern length matches the game pattern length
      checkAnswer(); // Calls checkAnswer to validate the user's input
  } else {
    return; // Exits if the user's pattern is not complete
  }
});

$(document).on("keydown", function () {
  if (gamePattern.length === 0) {
    $("h1").text("Level " + level); // Updates the heading with the current level
    nextSequence(); // Starts the game by generating the first sequence when a key is pressed
  }
});
