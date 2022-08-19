//DOM ELEMENTS
const inputEl = document.querySelector(".pw--length");
const btnStart = document.querySelector(".get--input");
const outputEl = document.querySelector(".pw--result__output");
const detailParentEl = document.querySelector(".pw--details");

//MAIN OBJECT
generatePassword = {
  //LOAD DATA TYPE
  loadData() {
    //store all in datalist
    this.dataList = [
      (this.alphabet = [
        ...(letterMax = this.getFromCharcode(65, 90)),
        ...(letterMin = this.getFromCharcode(97, 122)),
      ]),
      (this.special = this.getFromCharcode(33, 47)),
      (this.num = this.getFromCharcode(48, 57)),
    ];

    this.dataName = ["letters", "special", "num"];
    //create data occurence array
    this.initOccurence();
  },

  //init data type occurence
  initOccurence() {
    for (let i = 0; i < this.dataList.length; i++) {
      this.dataOccurence[i] = 0;
    }
  },

  //get wanted data from charcode
  getFromCharcode(startChartIndex, EndChartIndex) {
    let data = [];
    for (let i = startChartIndex; i <= EndChartIndex; i++) {
      data.push(String.fromCharCode(i));
    }
    return data;
  },

  //GENERATE PASSWORD
  result: [],
  dataOccurence: [],

  genPW(getInput, OutputEl) {
    //reset
    this.initOccurence();
    detailParentEl.innerHTML = "";
    let sum = [];

    //get data of n input number
    for (let i = 0; i < getInput; i++) {
      //get random number based on dataList
      let random = Math.trunc(Math.random() * this.dataList.length);
      //add occurence of the data type
      this.dataOccurence[random] += 1;
      //get random data type
      let getRandomData = this.dataList[random];
      //get random item of data type
      sum.push(this.getRandomItem(getRandomData));
    }
    this.result = this.shuffle(sum); //shuffle password
    this.result = sum.join("");
    OutputEl.textContent = this.result; //output data
    //details of occurence
    for (let i = 0; i < this.dataList.length; i++) {
      detailParentEl.innerHTML +=
        `<li>${this.dataName[i]} occurs ${this.dataOccurence[i]} times  </li>`.toUpperCase();
    }
  },

  //get random data of array depending array.length
  getRandomItem(arr) {
    let randomNum = Math.trunc(Math.random() * arr.length);
    return arr[randomNum];
  },

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); //get random
      [arr[i], arr[j]] = [arr[j], arr[i]]; //swap random actual el with el + 1 in index
    }
    return arr;
  },
};

//CALL
generatePassword.loadData();
btnStart.addEventListener("click", () =>
  generatePassword.genPW(inputEl.value, outputEl)
);
