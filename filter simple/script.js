"use strict";
//DOM ELEMENTS
const listEl = document.querySelector(".list--container");
const btnFilter = document.getElementById("get--form");
const yearsInput = document.getElementById("years");
const minsInput = document.getElementById("mins");
const typeInput = document.getElementById("type");
const ratedInput = document.getElementById("rated");

//VARIABLES
const movieList = [
  { title: "TITANIC", year: 1997, rate: 4.5, length: 195, type: ["drama"] },
  {
    title: "Ant-man",
    year: 2015,
    rate: 3.8,
    length: 116,
    type: ["sci-fi", "action"],
  },
  {
    title: "Dracula",
    year: 2020,
    rate: 2.9,
    length: 90,
    type: ["drama", "horror"],
  },
  {
    title: "Forrest Gump",
    year: 1994,
    rate: 4.6,
    length: 140,
    type: ["drama", "comedy", "Romance"],
  },
  {
    title: "LOTR: The Return of the King",
    year: 2003,
    rate: 4.5,
    length: 201,
    type: ["fantasy", "adventure"],
  },
  {
    title: "Safe House",
    year: 2012,
    rate: 3.3,
    length: 116,
    type: ["thriller", "action"],
  },
  {
    title: "Jumanji",
    year: 2017,
    rate: 3.5,
    length: 119,
    type: ["fantasy", "action"],
  },
  {
    title: "2001: A Space Odyssey",
    year: 1968,
    rate: 4.1,
    length: 141,
    type: ["sci-fi"],
  },
];

//FUNCTIONS
function displayMovieList() {
  for (let i = 0; i < movieList.length; i++) {
    //create el with index
    let el = document.createElement("li");
    el.classList.add(`index${i}`);
    //get data
    let title = movieList[i].title;
    let year = movieList[i].year;
    let rate = movieList[i].rate;
    let length = movieList[i].length;
    let [...typeArr] = movieList[i].type;
    let typeStr = typeArr.join(" ");

    //insert all data on el
    el.insertAdjacentHTML(
      "beforeend",
      `
  <h2 class='title'>${title}</h2>
  <p class='year'>${year} years</p>
  <p class='rate'>${rate} rated</p>
  <p class='length'>${length} mins</p>
  <p class='type'>${typeStr}</p>
  `
    );
    //insert to DOM
    listEl.appendChild(el);
  }
}

function filterEvent() {
  //reset filter every new request
  for (let i = 0; i < movieList.length; i++) {
    document.querySelector(`.index${i}`).classList.remove("hidden");
  }
  //get data filter
  let years = Number(yearsInput.value);
  let mins = Number(minsInput.value);
  let rated = Number(ratedInput.value);
  let type = typeInput.value;

  //check entire movie list
  for (let i = 0; i < movieList.length; i++) {
    //filter data without arr
    if (
      (years && years >= movieList[i].year) ||
      (mins && mins >= movieList[i].length) ||
      (rated && rated >= movieList[i].rate)
    ) {
      document.querySelector(`.index${i}`).classList.add("hidden");
    }
    //filter data with arr
    if (!movieList[i].type.join("").includes(type)) {
      document.querySelector(`.index${i}`).classList.add("hidden");
    }
  }
}

//RUN AND EVENT
displayMovieList();

btnFilter.addEventListener("click", () => filterEvent());
