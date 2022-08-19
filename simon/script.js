"use strict";
//DOM ELEMENTS
const btnGreen = document.querySelector(".index1");
const btnYellow = document.querySelector(".index2");
const btnRed = document.querySelector(".index3");
const btnBlue = document.querySelector(".index4");
const scoreEl = document.querySelector(".result");
const btnReplay = document.getElementById("replay");
const playingEl = document.getElementById("playing");

//VARIABLES
let index = 0;
let showColorEnd = false;
let isPlaying = false;
let nums = [];

//FUNCTIONS

//init
function init() {
  isPlaying = false;
  nums = [];
  for (let i = 1; i < 5; i++) {
    changeOpacity(i, "0.5");
  }
  playingEl.textContent = `PLAYING`;

  setTimeout(() => {
    round();
  }, 400);
}

//get random color
function getRandomNum() {
  return Math.trunc(Math.random() * 4) + 1;
}

//start new round
function round() {
  index = 0;
  showColorEnd = false;
  nums[nums.length] = getRandomNum();

  showColors(nums[index]);
}

//display colors if round begin, unless show color of btn if true
function showColors(elIndex) {
  index++;
  //when showing color before playing
  if (!showColorEnd) {
    changeOpacity(elIndex, "1");
    setTimeout(() => {
      changeOpacity(elIndex, "0.5");
      //loop if rest color to show
      if (index < nums.length) {
        setTimeout(() => {
          showColors(nums[index]);
        }, 150);
      } else {
        //when no more color
        showColorEnd = true;
        isPlaying = true;
        index = 0;
      }
    }, 500);
    //when it is player turn
  } else {
    changeOpacity(elIndex, "1");
    setTimeout(() => {
      changeOpacity(elIndex, "0.5");
    }, 300);
  }
}

//to see interaction
function changeOpacity(elIndex, value) {
  document.querySelector(`.index${elIndex}`).style.opacity = value;
}

//when a button is pressed
function checkChoice(Elindex) {
  //run only if it is player turn
  if (isPlaying) {
    //check if match
    if (Elindex === nums[index]) {
      //display color if true
      showColors(nums[index]);
    } else {
      //stop playing if false
      isPlaying = false;
      scoreEl.textContent = `Best score : ${nums.length - 1}`;
      playingEl.textContent = `YOU MADE A MISTAKE`;
      for (let i = 1; i < 5; i++) {
        changeOpacity(i, "1");
      }
    }

    //when all colors find without mistake
    if (index >= nums.length) {
      isPlaying = false;
      setTimeout(() => {
        round();
      }, 1000);
    }
  }
}

init();

//EVENT
btnGreen.addEventListener("click", () => {
  checkChoice(1);
});

btnYellow.addEventListener("click", () => {
  checkChoice(2);
});

btnRed.addEventListener("click", () => {
  checkChoice(3);
});

btnBlue.addEventListener("click", () => {
  checkChoice(4);
});

btnReplay.addEventListener("click", () => {
  init();
});
