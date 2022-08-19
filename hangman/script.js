"use strict";
//DOM ELEMENTS
const gameInput = document.getElementById("game--input");
const gameIMG = document.getElementById("game--image");
const wordStateEl = document.getElementById("word--state");
const isPlayingEl = document.getElementById("isPlaying");
const btnReset = document.getElementById("reset");
const usedList = document.getElementById("used");

//VARIABLES
const wordList = [
  "ORANGE",
  "BEAUTIFUL",
  "FRUIT",
  "SPEAK",
  "STRANGE",
  "TELEVISION",
  "WEIRD",
  "FORTUNATE",
  "STORING",
  "HONEY",
];
let word = [];
let wordState = [];
let letterUsed = new Set();
let input = "";
let mistake = 0;
let isPlaying = true;

//FUNCTIONS
function init() {
  //reset var
  changeState("PLAYING", true, false);
  wordState = [];
  word = [];
  letterUsed.clear();
  mistake = 0;
  gameIMG.src = `/assets/${mistake}.png`;
  usedList.textContent = "";

  //get a word from list
  word = wordList[Math.trunc(Math.random() * wordList.length)].split("");
  //get and display number of charact
  for (let i = 0; i < word.length; i++) {
    wordState.push("-");
  }
  wordStateEl.textContent = wordState.join("");
}

function inputEvent() {
  //run only if playing
  if (isPlaying) {
    disabledInpt(true);
    //store only if string type and not number
    if (typeof gameInput.value == "string" && !Number(gameInput.value)) {
      input = gameInput.value;
      input = input.toUpperCase();
      //DOM
      //check if match
      if (word.includes(input)) {
        //match
        //look for every occurence
        for (let i = 0; i < word.length; i++) {
          if (word[i] == input) wordState[i] = input;
        }
        //update DOM
        wordStateEl.textContent = wordState.join("");
      } else if (!letterUsed.has(input)) {
        //not match and letter never used
        mistake += 1;
        gameIMG.src = `/assets/${mistake}.png`;
        letterUsed.add(input);
        //show letter used DOM
        usedList.textContent += input;
      }
    } else {
      //not a string
      resetInptValue();
    }
    //check each case
    if (mistake == 10) {
      changeState("LOST", false, true);
    } else if (wordState.join("") == word.join("")) {
      changeState("WON", false, true);
    } else {
      setTimeout(() => {
        changeState("PLAYING", true, false);
      }, 400);
    }
  }
}

function changeState(isPlayingMSG, isPlayingBool, disbldBool) {
  isPlayingEl.textContent = isPlayingMSG;
  isPlaying = isPlayingBool;
  disabledInpt(disbldBool);
  resetInptValue();
}

function resetInptValue() {
  gameInput.value = "";
}

function disabledInpt(bool) {
  gameInput.disabled = bool;
  if (!bool) gameInput.focus();
}

init();

//EVENT LISTENER
gameInput.addEventListener("input", () => inputEvent());
btnReset.addEventListener("click", () => init());
