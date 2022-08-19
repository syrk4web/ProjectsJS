"use strict";
//DOM ELEMENTS
const btnRestart = document.getElementById("restart");
const modalEl = document.querySelector(".modal--ext");
const winMsgEl = document.querySelector(".modal--winner");

const ticTacToe = {
  //GET DOM EL
  init(winMSG, modal, restart) {
    this.winMSG = winMSG;
    this.modal = modal;
    this.restart = restart;
  },

  //INIT
  //arr number
  index: [1, 2, 3, 4, 5, 6, 7, 8, 9],

  resetRound() {
    for (let i = 0; i < this.index.length; i++) {
      //for each btn of DOM
      let el = document.querySelector(`.index${this.index[i]}`);
      el.style.backgroundImage = "none";
      el.addEventListener("click", () => this.play(el, this.index[i]));
    }
    this.restart.addEventListener("click", () => this.resetRound());

    this.playerActive = 1;
    this.player1 = [];
    this.player2 = [];
    this.alreadyPlay = [];
    this.winner = [];
    //DOM
    this.modal.classList.add("hidden");
  },

  //ALL GAME LOGIC
  play(el, elIndex) {
    //check if btn already pressed
    if (this.alreadyPlay.includes(elIndex)) return;
    this.alreadyPlay.push(elIndex);
    //display good IMG
    this.playerActive === 1
      ? (el.style.backgroundImage = "url(/assets/cross.png)")
      : (el.style.backgroundImage = "url(/assets/circle.png)");
    //add index to right player
    this.playerActive === 1
      ? this.player1.push(elIndex)
      : this.player2.push(elIndex);
    //check if win
    this.checkWin();
    //display if win
    this.displayResult();
    //if not, change player
    this.playerActive = this.playerActive === 2 ? 1 : 2;
  },

  //CHECK WINNER
  winner: [],

  //check if there is a winner
  checkWin() {
    if (this.player1.length >= 3) {
      if (this.playerActive === 1) {
        this.checkPlayer(this.playerActive, this.player1);
      } else if (this.playerActive === 2) {
        this.checkPlayer(this.playerActive, this.player2);
      } else return;
    }
  },

  //check all cases with current player value
  checkPlayer(playerActive, playerArr) {
    for (let i = 0; i < this.allCase.length; i++) {
      if (this.winner[playerActive - 1] !== true) {
        this.winner[playerActive - 1] = this.caseOfWin(
          playerArr,
          this.allCase[i][0],
          this.allCase[i][1],
          this.allCase[i][2]
        );
      }
    }
  },

  //all possibilites to win
  allCase: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ],

  //check one case
  caseOfWin(playerArr, n1, n2, n3) {
    if (
      playerArr.includes(n1) &&
      playerArr.includes(n2) &&
      playerArr.includes(n3)
    )
      return true;
  },

  //DISPLAY WINNER

  //display result if win/draw
  displayResult() {
    setTimeout(() => {
      if (this.winner[0] === true) {
        this.displayWinner(1);
        this.addResult(0);
      }
      if (this.winner[1] === true) {
        this.displayWinner(2);
        this.addResult(1);
      }
      if (
        this.player1.length + this.player2.length >= 9 &&
        !this.winner.includes(true)
      )
        this.displayDraw();
    }, 150);
  },

  //display if winner
  displayWinner(index) {
    this.modal.classList.remove("hidden");
    this.winMSG.textContent = `The winner is player ${index}`;
  },

  //display if no winner
  displayDraw() {
    this.modal.classList.remove("hidden");
    this.winMSG.textContent = `This is a draw`;
  },

  //iNCREASE RESULT
  result: [0, 0],

  //add when display result
  addResult(index) {
    this.result[index] += 1;
    document.querySelector(
      `.result--p${index + 1}`
    ).textContent = `${this.result[index]} points`;
  },
};

ticTacToe.init(winMsgEl, modalEl, btnRestart);
ticTacToe.resetRound();
