"use strict";

//DOM ELEMENTS
const mazeEl = document.getElementById("maze--container");

//VARIABLES
const mazeLength = 36;
const mazeRow = [];
const mazeList = [
  [
    -1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 2,
  ],
  [
    -1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1,
    0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 2,
  ],
  [
    -1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0,
    1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 2,
  ],
];
let mazeIndex = 0;
let [...mazeTemplate] = mazeList[mazeIndex];
let index = 0;
let isPlaying = true;

//FUNCTIONS
function init() {
  getRowEndNew();
  createMaze();
}

function getRowEndNew() {
  let multiple = 1;
  for (let i = 0; i < mazeLength; i++) {
    let multipleSQRT = Math.sqrt(mazeLength) * multiple;
    if (i === multipleSQRT) {
      mazeRow[i - 1] = 1;
      mazeRow[i] = 1;
      multiple++;
    } else {
      mazeRow.push(0);
    }
  }
}

function createMaze() {
  //create maze dimensions
  while (index < mazeLength) {
    //create el and coords
    let el = document.createElement("div");
    el.className = `maze--el i${index}`;
    initMazeCSS(el);
    //inject to DOM
    mazeEl.appendChild(el);
    index++;
  }
  //start play
  if (index === mazeLength) isPlaying = true;
}

function initMazeCSS(el) {
  //add mazeTemplate
  el.classList.remove("wall");
  if (mazeTemplate[index] === -1) el.classList.add("player");
  if (mazeTemplate[index] === 1) el.classList.add("wall");
  if (mazeTemplate[index] === 2) {
    el.classList.remove("player");
    el.classList.remove("win");
    el.classList.add("end");
  }
}

function keyEvent(lastPos, shiftNum) {
  let newIndex = lastPos + shiftNum;
  //check win
  if (mazeTemplate[newIndex] === 2) {
    //DOM
    document.querySelector(`.i${lastPos}`).classList.remove("player");
    document.querySelector(`.i${newIndex}`).classList.add("win");
    //new maze
    isPlaying = false;
    setTimeout(() => {
      nextMaze();
    }, 400);
  }
  //check if forbidden move (right/left on new row)
  if (
    Math.abs(shiftNum) === 1 &&
    mazeRow[lastPos] === 1 &&
    mazeRow[newIndex] === 1
  ) {
    return;
    //if not, check if no wall and stay on maze
  } else {
    if (
      newIndex < mazeTemplate.length &&
      newIndex >= 0 &&
      !document.querySelector(`.i${newIndex}`).classList.contains("wall")
    ) {
      //if true, upload position and DOM
      //give new position value -1
      mazeTemplate[newIndex] = -1;
      //change last position value
      mazeTemplate[lastPos] = 0;
      //change DOM
      document.querySelector(`.i${lastPos}`).classList.remove("player");
      document
        .querySelector(`.i${mazeTemplate.indexOf(-1)}`)
        .classList.add("player");
    }
  }
}

function nextMaze() {
  //if other maze
  index = 0;
  mazeIndex++;
  mazeTemplate = mazeList[mazeIndex];
  console.log(mazeTemplate);
  while (index < mazeLength) {
    let el = document.querySelector(`.i${index}`);
    initMazeCSS(el);
    //inject to DOM
    index++;
  }
  //start play
  if (index === mazeLength) isPlaying = true;
  console.log(isPlaying, mazeTemplate.indexOf(-1));
}

init();

//KEYBOARD
document.addEventListener(
  "keydown",
  (event) => {
    if (isPlaying) {
      let getName = event.key;
      let lastPos = mazeTemplate.indexOf(-1);
      //go down
      if (getName === "s") keyEvent(lastPos, Math.sqrt(mazeLength));
      //go up
      if (getName === "z") keyEvent(lastPos, -Math.sqrt(mazeLength));
      //go right
      if (getName === "d") keyEvent(lastPos, 1);
      //go left
      if (getName === "q") keyEvent(lastPos, -1);
    }
  },
  false
);
