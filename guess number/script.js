"use strict";

//DOM ELEMENTS
const inputEl = document.getElementById("get--num");
const btnStart = document.getElementById("start");
const stateEl = document.querySelector(".main--state");
const attemptEl = document.querySelector(".main--attempt__num");

//VARIABLES
let numToGuess = Math.trunc(Math.random() * 20 + 1);
let attempt = 0;
let isPlaying = true;

//FUNCTIONS
function btnEvent() {
  if (isPlaying) {
    let input = Number(inputEl.value);
    if (input > numToGuess) {
      stateAndTry("NUM IS LOWER");
    } else if (input < numToGuess) {
      stateAndTry("NUM IS HIGHER");
    } else {
      stateAndTry("YOU GET IT!");
      btnStartAndisPlaying("RESTART", false);
    }
  } else {
    init();
  }
}

function init() {
  numToGuess = Math.trunc(Math.random() * 20 + 1);
  stateEl.textContent = "INDICATION";
  attempt = 0;
  attemptEl.textContent = attempt;
  inputEl.value = "";
  btnStartAndisPlaying("GUESS", true);
}

function stateAndTry(stateMSG) {
  stateEl.textContent = stateMSG;
  attempt++;
  attemptEl.textContent = attempt;
}

function btnStartAndisPlaying(btnMSG, bool) {
  btnStart.textContent = btnMSG;
  isPlaying = bool;
}

//EVENT
btnStart.addEventListener("click", () => btnEvent());
