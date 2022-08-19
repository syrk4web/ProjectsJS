"use strict";
//DOM ELEMENTS
const txtInputEl = document.querySelector(".text--input");
const btnStart = document.getElementById("start");
const shiftInputEl = document.getElementById("shift--value");
const outputEl = document.querySelector(".text--result__output");

//VARIABLES
const alpha = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

//FUNCTIONS
function shiftEvent() {
  //get value
  let [...txtInput] = txtInputEl.value.trim().toUpperCase().split("");
  let shiftInput = Number(shiftInputEl.value);
  //reverse alpha order if num -
  if (typeof shiftInput === "number") {
    //reverse if neg
    let isNeg = shiftInput < 0 ? true : false;
    reverseAbc(isNeg);
    shiftInput = Math.abs(shiftInput);

    for (let i = 0; i < txtInput.length; i++) {
      let shiftIndex = alpha.indexOf(txtInput[i]) + shiftInput;
      //if not a letter
      if (!alpha.includes(txtInput[i])) continue;
      //if letter
      if (shiftIndex > 25) {
        //return to first letter if reach end
        txtInput[i] = alpha[shiftIndex - 26];
      } else {
        //others cases
        txtInput[i] = alpha[shiftIndex];
      }
    }
    //re-reverse if it was and output
    reverseAbc(isNeg);
    outputEl.textContent = txtInput.join("");
  }
}

function reverseAbc(bool) {
  if (bool) alpha.reverse();
}

//EVENT
btnStart.addEventListener("click", () => shiftEvent());
