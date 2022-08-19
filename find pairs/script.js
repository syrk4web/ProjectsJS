"use strict";
//DOM ELEMENTS
const stateEl = document.getElementById("state");
const btnRestart = document.getElementById("restart");

//VARIABLES
let combinate = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let compare = [];
let elCompare = [];
let inactiveBtn = [];
let state = 0;

//FUNCTIONS
function reset() {
  //reset var
  compare = [];
  elCompare = [];
  inactiveBtn = [];
  state = 0;
  combinate.sort((a, b) => 0.5 - Math.random());
  //reset DOM
  stateEl.textContent = "PLAYING";
  for (let i = 0; i < combinate.length; i++) {
    changeTxtDOM(i, "?");
    document.querySelector(`.index${i}`).classList.remove("no--cursor");
  }
}

function btnEvent(iEl) {
  //if btn active and not comparing
  if (!inactiveBtn.includes(iEl) && compare.length < 2) {
    //inactive temporaly
    inactiveBtn.push(iEl);
    //DOM
    toggleCursorDOM(iEl);
    changeTxtDOM(iEl, combinate[iEl]);
    //add info arr
    compare.push(combinate[iEl]);
    elCompare.push(iEl);
    //when two combinate num to compare
    if (compare.length == 2) {
      //check if match of not
      if (compare[0] === compare[1]) {
        //case match
        compare = [];
        elCompare = [];
        state += 1;
      } else {
        //case don't match
        setTimeout(() => {
          for (let i = 0; i < 2; i++) {
            //reset DOM
            changeTxtDOM(elCompare[i], "?");
            toggleCursorDOM(elCompare[i]);
            //reactive last two btns
            inactiveBtn.pop();
          }
          //reset info arr
          compare = [];
          elCompare = [];
        }, 500);
      }
    }
  }
  //check if game end
  if (state == combinate.length / 2) {
    stateEl.textContent = "WIN !";
  }
}

function changeTxtDOM(indexEl, content) {
  document.querySelector(`.index${indexEl}`).textContent = content;
}

function toggleCursorDOM(indexEl) {
  document.querySelector(`.index${indexEl}`).classList.toggle("no--cursor");
}

//BTN EVENT LISTENER
for (let i = 0; i < combinate.length; i++) {
  document
    .querySelector(`.index${i}`)
    .addEventListener("click", () => btnEvent(i));
}

btnRestart.addEventListener("click", () => reset());
