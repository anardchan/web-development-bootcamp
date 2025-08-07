var drumButtons = document.querySelectorAll(".drum");

var tom1Sound = new Audio("./sounds/tom-1.mp3");
var tom2Sound = new Audio("./sounds/tom-2.mp3");
var tom3Sound = new Audio("./sounds/tom-3.mp3");
var tom4Sound = new Audio("./sounds/tom-4.mp3");
var snareSound = new Audio("./sounds/snare.mp3");
var crashSound = new Audio("./sounds/crash.mp3");
var kickSound = new Audio("./sounds/kick.mp3");

for (var i = 0; i < drumButtons.length; i++) {
    drumButtons[i].addEventListener("click", function(){ 
        var buttonLetter = this.textContent;
        makeSound(buttonLetter);
        buttonAnimation(buttonLetter);
        }
    );
}

document.addEventListener("keydown", function(event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "w":
            tom1Sound.currentTime = 0; 
            tom1Sound.play();
            break;
        case "a":
            tom2Sound.currentTime = 0;
            tom2Sound.play();
            break;
        case "s":
            tom3Sound.currentTime = 0;
            tom3Sound.play();
            break;
        case "d":
            tom4Sound.currentTime = 0;
            tom4Sound.play();
            break;
        case "j":
            snareSound.currentTime = 0;
            snareSound.play();
            break;
        case "k":
            crashSound.currentTime = 0;
            crashSound.play();
            break;
        case "l":
            kickSound.currentTime = 0;
            kickSound.play();
            break;
        default:
            console.log(key);
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}