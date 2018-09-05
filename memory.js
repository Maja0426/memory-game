const red = document.querySelectorAll(".red");
const blue = document.querySelectorAll(".blue");
const green = document.querySelectorAll(".green");
const yellow = document.querySelectorAll(".yellow");
const center = document.querySelectorAll(".center");
const reset = document.querySelector(".newGame");
const easyGame = document.querySelector(".easy");
const mediumGame = document.querySelector(".medium");
const hardGame = document.querySelector(".hard");
const gOver = document.querySelector(".gOver");
const gWin = document.querySelector(".gWin");

let gameMatch = true;
let colorCode = 0;
let randomColors = [];
let gameLevel = 4;
let randomPulse = [red, blue, green, yellow];

var beep = new Howl({
  src: ['Beep2.wav']
});

var endSound = new Howl({
  src: ['Shut_Down1.wav']
});

var winSound = new Howl({
  src: ['rimshot.wav']
});

function pulse(color) {
  color.forEach(element => element.classList.add("blink-2"));
  setTimeout(() => {
    color.forEach(element => element.classList.remove("blink-2"));
  }, 800);
}

function matchGame() {
    for (i = 0; i < 3; i++) {
      red[i].addEventListener("click", function () {
        pulse(red);
        colorCode = 0;
        clickingColors();
      });

      blue[i].addEventListener("click", function () {
        pulse(blue);
        colorCode = 1;
        clickingColors();
      });

      green[i].addEventListener("click", function () {
        pulse(green);
        colorCode = 2;
        clickingColors();
      });

      yellow[i].addEventListener("click", function () {
        pulse(yellow);
        colorCode = 3;
        clickingColors();
      });
    }
}


function clickingColors() {
  console.log(colorCode);
  if (colorCode !== randomColors[0] && randomColors.length > 0) {
    console.log("ROSSZ SZÍN, VESZTETTÉL!");
    endSound.play();
    gameOver("none", "block");

  } else {
    beep.play();
    console.log("JÓ SZÍN");
    randomColors.shift();
  }
  if (randomColors.length < 1) {
    winSound.play();
    console.log("Gratulálok, nyertél!");
    gameWin("none", "block");
  }
}

function gameOver(item1, item2) {
  for (i = 0; i < 3; i++) {
    red[i].classList.add(item1);
    blue[i].classList.add(item1);
    green[i].classList.add(item1);
    yellow[i].classList.add(item1);
    red[i].classList.remove(item2);
    blue[i].classList.remove(item2);
    green[i].classList.remove(item2);
    yellow[i].classList.remove(item2);
  }
  gOver.classList.add(item2);
  gOver.classList.remove(item1);
}

function gameWin(item1, item2) {
  for (i = 0; i < 3; i++) {
    red[i].classList.add(item1);
    blue[i].classList.add(item1);
    green[i].classList.add(item1);
    yellow[i].classList.add(item1);
    red[i].classList.remove(item2);
    blue[i].classList.remove(item2);
    green[i].classList.remove(item2);
    yellow[i].classList.remove(item2);
  }
  gWin.classList.add(item2);
  gWin.classList.remove(item1);
}

function resetGame() {
  gameOver("block", "none");
  gameWin("block", "none")
  gameMatch = true;
  randomColors = [];
  colorCode = 0;
  gameLevel = gameLevel;
}

function randomColorGenerator() {
  for (var i = 0; i < gameLevel; i++) {
    randomColors[i] = Math.floor(Math.random() * 4);
  }
  showColors(0);
}

function showColors(i) {
 if (randomColors[i]) {
 }
  pulse(randomPulse[randomColors[i++]]);
  beep.play();
  setTimeout(function () { showColors(i); }, 1000);
  } 

easyGame.style.color = "rgb(0, 0, 255)"; 
mediumGame.style.color = "rgb(0, 180, 0)";
hardGame.style.color = "rgb(255, 187, 0)";
matchGame();

reset.addEventListener("click", function () {
  resetGame();
  randomColorGenerator();
});

easyGame.addEventListener("click", function () {
  easyGame.classList.add("selected");
  mediumGame.classList.remove("selected");
  hardGame.classList.remove("selected");
  gameLevel = 4;
  resetGame();
  randomColorGenerator();
});

mediumGame.addEventListener("click", function () {
  mediumGame.classList.add("selected");
  hardGame.classList.remove("selected");
  easyGame.classList.remove("selected");
  gameLevel = 6;
  resetGame();
  randomColorGenerator();
});

hardGame.addEventListener("click", function () {
  hardGame.classList.add("selected");
  mediumGame.classList.remove("selected");
  easyGame.classList.remove("selected");
  gameLevel = 12;
  resetGame();
  randomColorGenerator();
});
