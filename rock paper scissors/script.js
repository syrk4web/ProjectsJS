"use strict";
//DOM ELEMENTS
const btnResult = document.getElementById("result");
const choiceIAEl = document.getElementById("ia--choice");

//VARIABLES
const cases = ["rock", "scissors", "paper"];

//FUNCTIONS
function btnEvent(choicePlayer) {
  //get index of cases using choices
  let player = cases.indexOf(choicePlayer);
  let ia = Math.trunc(Math.random() * 3);
  //DOM
  choiceIAEl.textContent = cases[ia].toUpperCase();
  //game logic
  if (player < ia && Math.abs(player - ia) !== 2) {
    btnResult.textContent = "PLAYER WON";
  } else if (player == ia) {
    btnResult.textContent = "DRAW";
  } else btnResult.textContent = "IA WON";
}

//EVENT LISTENER
for (let i = 0; i < 3; i++) {
  document
    .querySelector(`.index${i}`)
    .addEventListener("click", () => btnEvent(cases[i]));
}
