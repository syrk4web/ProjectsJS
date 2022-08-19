"use strict";
//DOM ELEMENTS
const inputEl = document.querySelector(".text--input");
const btnStart = document.querySelector(".start");
const outputEl = document.querySelector(".text--result__output");

//NORMAL TO LEET EVENT
btnStart.addEventListener("click", () => {
  let input = inputEl.value.trim().toUpperCase();
  let result = "";
  for (let i = 0; i < input.length; i++)
    result += alpha.includes(input.substr(i, 1))
      ? leet[alpha.indexOf(input.substr(i, 1))]
      : input.substr(i, 1);

  outputEl.textContent = result;
});

//CARACT LIST
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
  " ",
];

const leet = [
  "4",
  "8",
  "(",
  "[)",
  "3",
  "|=",
  "6",
  "#",
  "1",
  "_|",
  "|<",
  "|_",
  "|v|",
  "|V",
  "0",
  "|*",
  "()_",
  "2",
  "5",
  "7",
  "|_|",
  "1/",
  "vv",
  "><",
  "'/",
  "=/=",
  " ",
];
