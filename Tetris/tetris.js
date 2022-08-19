//BLOC OPTIONS
class BlocOptions {
  constructor() {}

  //options to render a bloc
  _getBlocOptns(lineDeb, colDeb, colEnd, config, colorClass) {
    const startLine = document.querySelector(`[data-is="line-${lineDeb}"]`);
    for (let bloc = colDeb; bloc < colEnd; bloc++) {
      const startCols = startLine.querySelector(`[data-position="${bloc}"]`);
      //bloc data and attribute
      startCols.classList.add(`${colorClass}`);
      startCols.dataset.status = 2;
      startCols.dataset.blocConfig = config;
    }
    this._currCfg = config;
  }

  //get a random bloc, use with GameLogic
  _getRdmBloc() {
    const blocs = [
      this._getZ,
      this._getZRvrse,
      this._getL,
      this._getLRvrse,
      this._getCube,
      this._getRod,
    ];
    const rdmBloc = Math.floor(Math.random() * blocs.length);
    return blocs[rdmBloc].call(this);
  }

  //pattern when rotating bloc
  _blocPattrn(line, col, [n1, n2, n3, n4, n5, n6]) {
    const arr = [
      `${Number(line) + n1}.${Number(col) + n2}`,
      `${Number(line) + n3}.${Number(col) + n4}`,
      `${Number(line) + n5}.${Number(col) + n6}`,
    ];
    console.log(`${Number(line) + n1}.${Number(col) + n2}`);
    return arr;
  }

  //retrieve pattern
  _blocPtrn(ctrLine, ctrCol, ptrnArr) {
    const pattern = this._blocPattrn(ctrLine, ctrCol, ptrnArr);
    return pattern;
  }

  //get info of bloc's center to rotate
  _blocCenterInfo(num) {
    const blocCtrPos = this.blocs[num];
    const [line, col, status] = this._spltLCS(blocCtrPos);
    const elCenter = this._getBoxEl(line, col);
    return [blocCtrPos, elCenter, line, col, status];
  }

  //get all needed info to rotate bloc
  _getBlocConfig(ctrBlcNm, ptrn) {
    const [blocCtrPos, elCenter, line, col, sttts] =
      this._blocCenterInfo(ctrBlcNm);
    const pattern = this._blocPtrn(line, col, ptrn);
    return [blocCtrPos, elCenter, pattern];
  }
}
//LIST OF BLOC
class BlocZ extends BlocOptions {
  constructor() {
    super();
  }

  //bloc Z
  _getZ() {
    const config = "Z1";
    this._getBlocOptns(this.lineNum - 1, 5, 7, config, "bg-Z");
    this._getBlocOptns(this.lineNum - 2, 6, 8, config, "bg-Z");
  }

  _ZCfg() {
    let pos, el, ptrn;

    if (this._currCfg === "Z1" || this._currCfg === "Z3")
      [pos, el, ptrn] = this._getBlocConfig(0, [-1, 0, 0, 1, 1, 1]);

    if (this._currCfg === "Z2" || this._currCfg === "Z4")
      [pos, el, ptrn] = this._getBlocConfig(2, [0, -1, 1, -1, 1, -2]);

    return [pos, el, ptrn];
  }
}

class BlocZRev extends BlocZ {
  constructor() {
    super();
  }

  _getZRvrse() {
    const config = "N1";
    this._getBlocOptns(this.lineNum - 1, 6, 8, config, "bg-ZR");
    this._getBlocOptns(this.lineNum - 2, 5, 7, config, "bg-ZR");
  }

  _ZRevCfg() {
    let pos, el, ptrn;

    if (this._currCfg === "N1" || this._currCfg === "N3")
      [pos, el, ptrn] = this._getBlocConfig(1, [-1, 0, 0, -1, 1, -1]);

    if (this._currCfg === "N2" || this._currCfg === "N4")
      [pos, el, ptrn] = this._getBlocConfig(2, [0, -1, 1, 0, 1, 1]);

    return [pos, el, ptrn];
  }
}

class BlocL extends BlocZRev {
  constructor() {
    super();
  }

  _getL() {
    const config = "L1";
    this._getBlocOptns(this.lineNum - 1, 5, 6, config, "bg-L");
    this._getBlocOptns(this.lineNum - 2, 5, 8, config, "bg-L");
  }

  _LCfg() {
    let pos, el, ptrn;

    if (this._currCfg === "L1")
      [pos, el, ptrn] = this._getBlocConfig(0, [0, 1, -1, 0, -2, 0]);

    if (this._currCfg === "L2")
      [pos, el, ptrn] = this._getBlocConfig(2, [0, -1, 0, -2, -1, 0]);

    if (this._currCfg === "L3")
      [pos, el, ptrn] = this._getBlocConfig(3, [0, -1, 1, 0, 2, 0]);

    if (this._currCfg === "L4")
      [pos, el, ptrn] = this._getBlocConfig(1, [1, 0, 0, 1, 0, 2]);

    return [pos, el, ptrn];
  }
}

class BlocLRev extends BlocL {
  constructor() {
    super();
  }

  _getLRvrse() {
    const config = "T1";
    this._getBlocOptns(this.lineNum - 1, 7, 8, config, "bg-LR");
    this._getBlocOptns(this.lineNum - 2, 5, 8, config, "bg-LR");
  }

  _LRevCfg() {
    let pos, el, ptrn;

    if (this._currCfg === "T1")
      [pos, el, ptrn] = this._getBlocConfig(2, [0, 1, 1, 0, 2, 0]);

    if (this._currCfg === "T2")
      [pos, el, ptrn] = this._getBlocConfig(0, [0, 1, 0, 2, -1, 0]);

    if (this._currCfg === "T3")
      [pos, el, ptrn] = this._getBlocConfig(1, [0, -1, -1, 0, -2, 0]);

    if (this._currCfg === "T4")
      [pos, el, ptrn] = this._getBlocConfig(3, [1, 0, 0, -1, 0, -2]);

    return [pos, el, ptrn];
  }
}

class BlocCbe extends BlocLRev {
  constructor() {
    super();
  }
  _getCube() {
    const config = "C1";
    this._getBlocOptns(this.lineNum - 1, 5, 7, config, "bg-cube");
    this._getBlocOptns(this.lineNum - 2, 5, 7, config, "bg-cube");
  }
}

class BlocRod extends BlocCbe {
  constructor() {
    super();
  }

  _getRod() {
    const config = "R1";
    this._getBlocOptns(this.lineNum - 1, 4, 8, config, "bg-rod");
  }

  _RodCfg() {
    let pos, el, ptrn;

    if (this._currCfg === "R1" || this._currCfg === "R3")
      [pos, el, ptrn] = this._getBlocConfig(2, [-1, 0, 1, 0, -2, 0]);

    if (this._currCfg === "R2" || this._currCfg === "R4")
      [pos, el, ptrn] = this._getBlocConfig(2, [0, 1, 0, -1, 0, -2]);

    return [pos, el, ptrn];
  }
}

class EventUtils extends BlocRod {
  constructor() {
    super();
  }

  //retrieve a string with all grid boxes positions
  _getAllPos() {
    let data = "";
    //for each line get all cols
    for (let i = 0; i < this.lineNum; i++) {
      const line = document.querySelector(`[data-is="line-${i}"]`);
      const cols = line.querySelectorAll('[data-is^="col"]');
      //get data on format line.col.status fir all cols
      cols.forEach((col) => {
        data += `${i}.${col.dataset.position}.${col.dataset.status} `; //get data of each cols
      });
    }
    this.position = data.trim(); //string with all positions
  }

  //get positions of bloc only
  _getBlocs() {
    let blocPos = [];
    this.position.split(" ").forEach((pos) => {
      const [line, col, status] = this._spltLCS(pos); //split old and new pos
      if (Number(status) == 2) return blocPos.push(pos); //check status
    });
    return (this.blocs = blocPos);
  }

  //get positions of all static blocs
  _getStatics() {
    let staticPos = [];
    this.position.split(" ").forEach((pos) => {
      const [line, col, status] = this._spltLCS(pos); //split old and new pos
      if (Number(status) == 1) return staticPos.push(pos); //check status
    });
    return (this.statics = staticPos);
  }

  //set a box as a bloc
  _setBlcData(el, center, config, clss, status) {
    el.dataset.status = status;
    el.dataset.class = clss;
    if (center) el.dataset.blocCenter = center;
    if (config) el.dataset.blocConfig = config;
    const str = clss;
    const parentDataIs = el.parentElement.dataset.is;
    el.className =
      parentDataIs !== `line-${this.lineNum - 1}` ||
      parentDataIs !== `line-${this.lineNum - 2}`
        ? clss.replace("border-white", "")
        : clss;
  }

  //get data of a bloc
  _getBlcData(el) {
    let center, config;
    center = el.dataset.blocCenter ? el.dataset.blocCenter : false;
    config = el.dataset.blocConfig ? el.dataset.blocConfig : false;
    return [center, config, el.className, el.dataset.status];
  }

  //set a bloc as empty box
  _setEmpty(el) {
    el.dataset.status = 0;
    if (el.dataset.blocConfig) delete el.dataset.blocConfig;
    const clss =
      "col h-100 border-left-1 border border-end-1 border-bottom-0 border-top-0 p-0";
    const parentDataIs = el.parentElement.dataset.is;
    el.className =
      parentDataIs === `line-${this.lineNum - 1}` ||
      parentDataIs === `line-${this.lineNum - 2}`
        ? clss + " border-white"
        : clss;
  }

  //separate box pairs and retrieve two elements
  _getElsFromDblePos(pos) {
    const [oldPos, newPos] = this._spltBoxPair(pos); //split old and new pos
    const [oldLine, oldCol, oldSt, oldPosEl] = this._getInfoFromPos(oldPos);
    const [newLine, newCol, newSt, newPosEl] = this._getInfoFromPos(newPos);
    return [oldPosEl, newPosEl];
  }

  _spltBoxPair(arr) {
    const [...splitArr] = arr.join().split(","); //split line, col and status
    return [splitArr[0], splitArr[1]];
  }

  //split line, col and status of a position
  _spltLCS(arr) {
    const [...splitArr] = arr.split(".");
    return [Number(splitArr[0]), Number(splitArr[1]), Number(splitArr[2])];
  }

  //retrive split pos and element from a string pos
  _getInfoFromPos(pos) {
    const [line, col, status] = this._spltLCS(pos); //get split pos
    const el = this._getBoxEl(line, col);
    return [line, col, status, el];
  }

  //get a box element
  _getBoxEl(linePos, colPos) {
    return document
      .querySelector(`[data-is="line-${linePos}"] `)
      .querySelector(`[data-position="${colPos}"]`);
  }

  //get all lines
  _getLines() {
    return document.querySelectorAll(`[data-is^="line"]`);
  }

  //get positions filter by cols and not lines
  _fltrByCols() {
    let str = " ";
    const arr = this.position.split(" ");
    for (let index = 0; index < this.colNum; index++) {
      const filter = arr.filter((pos) => pos.includes(`.${index}.`));
      if (filter.length > 0) str += filter.join() + "||";
    }
    return str.slice(0, -2).split("||");
  }
}

//MOVE ARROW LOGIC
class EventArrow extends EventUtils {
  constructor() {
    super();
  }

  //redirect to good logic depending arrow
  _arrowHandler(key) {
    this._getAllPos(); //get actual position
    this._getBlocs(); //get actual blocs
    if (key == "ArrowRight") this._arrowLogic("right", 1);
    if (key == "ArrowLeft") this._arrowLogic("left", -1);
    if (key == "ArrowDown") this._arrowLogic("down", -1);
  }

  //all logic when pressing arrow
  _arrowLogic(move, moveNum) {
    let canMove = true;
    let updateArr = [];
    //check for all bloc boxes
    this.blocs.forEach((pos) => {
      if (!canMove) return;
      const [line, col, status] = this._spltLCS(pos); //get split pos
      let result;
      //check if arrow event valid depending the move
      result =
        move === "down"
          ? this._isNextElValid(line + moveNum, col) //check for down
          : this._isNextElValid(line, col + moveNum); //check for left and right
      //push on arr the position to update if all is valid
      result ? updateArr.push([`${pos}, ${result}`]) : (canMove = false);
    });
    if (move === "right") updateArr.reverse(); //avoid updating issue order with right arrow
    if (canMove) return this._updateArrow(updateArr, move); //update position on grid
  }

  //check if bloc can be update to arrow move
  _isNextElValid(line, col) {
    //filters
    if (
      line < 0 ||
      line > this.lineNum - 1 ||
      col < 0 ||
      col > this.colNum - 1 ||
      !this._getBoxEl(line, col) ||
      Number(this._getBoxEl(line, col).dataset.status) === 1
    )
      return false; //no next el
    //if pass all return el
    return `${line}.${this._getBoxEl(line, col).dataset.position}.${
      this._getBoxEl(line, col).dataset.status
    }`;
  }

  //update bloc position
  _updateArrow(updtArr) {
    updtArr.forEach((pos) => {
      //get current bloc box and where to update it
      const [currBloc, newPosEl] = this._getElsFromDblePos(pos);
      const [blocCtr, blocCfg, blocClass, blocStatus] =
        this._getBlcData(currBloc);
      this._setBlcData(newPosEl, blocCtr, blocCfg, blocClass, blocStatus); //update new bloc pos
      this._setEmpty(currBloc); //old bloc is now empty
    });
  }
}
//ROTATE BLOC LOGIC
class EventSpace extends EventArrow {
  constructor() {
    super();
  }

  //redirect on good bloc config logic
  _spaceHandler() {
    this._getAllPos(); //update all pos
    this._getBlocs(); //update blocs
    //get actual bloc data config
    let pos, el, ptrn;
    if (this._currCfg.includes("C")) return;
    if (this._currCfg.includes("Z")) [pos, el, ptrn] = this._ZCfg();
    if (this._currCfg.includes("N")) [pos, el, ptrn] = this._ZRevCfg();
    if (this._currCfg.includes("T")) [pos, el, ptrn] = this._LRevCfg();
    if (this._currCfg.includes("L")) [pos, el, ptrn] = this._LCfg();
    if (this._currCfg.includes("R")) [pos, el, ptrn] = this._RodCfg();
    //check config
    return this._rotateLogic(pos, el, ptrn);
  }

  //check if can rotate bloc depending bloc config and actual pos
  _rotateLogic(blocCtrPos, blocCtrEl, currPtrn) {
    const pattern = currPtrn;
    const nextCfgArr = this._canRotate(pattern); //get update pos or false
    if (!nextCfgArr) return;
    nextCfgArr.push(blocCtrPos); //add bloc center on config
    this._updateCfg(blocCtrEl, this.blocs, nextCfgArr); //update pos
  }

  //filters to check if can rotate
  _canRotate(nxtCfgArr) {
    if (nxtCfgArr.length === 0) return false;
    let newPos = [];
    nxtCfgArr.forEach((cfg) => {
      //check if el exist
      const [line, col] = cfg.split(".");
      if (
        line < 0 ||
        line > this.lineNum - 1 ||
        col < 0 ||
        col > this.colNum - 1
      )
        return;
      //if exist, check status
      const el = this._getBoxEl(line, col);
      const elStatus = Number(el.dataset.status);
      if (el === 1) return;
      newPos.push(`${line}.${col}`);
    });
    //depend result
    return newPos.length === 3 ? newPos : false;
  }

  //change rotation
  _updateCfg(elCenter, currCfg, nxtCfg) {
    const clss = elCenter.classList.value;
    this._newCfg(); //change this._currCfg
    //curr pos become empty boxes
    currCfg.forEach((pos) => {
      const [line, col, status, el] = this._getInfoFromPos(pos);
      this._setEmpty(el);
    });
    //new bloc pos boxes
    nxtCfg.forEach((pos) => {
      const [line, col, status, el] = this._getInfoFromPos(pos);
      el.classList = `${clss}`;
      el.dataset.status = 2;
      el.dataset.blocConfig = this._currCfg;
    });
  }

  _newCfg() {
    const [...cfg] = this._currCfg.split("");
    let num = Number(cfg[1]);
    if (num === 4) num = 0;
    if (num !== 4) num++;
    return (this._currCfg = `${cfg[0]}${num}`);
  }
}

class MobileEvent extends EventSpace {
  constructor() {
    super();
    //when clicking a controller, redirect to link arrow/space event
  }
}

//INTERACTION WITH STATIC BLOC LOGIC
class GameLogic extends MobileEvent {
  constructor() {
    super();
  }

  //update game very tick call
  _tick() {
    //delay for updating grid
    if (this.tickWaitCount < this.totalTickWait) this.tickWaitCount++;

    setTimeout(() => {
      this._getAllPos(); //update grid
      this._getBlocs(); // get curr blocs

      //if bloc, go down or go static
      const canMove = this.blocs.length !== 0 ? this._blocCanMove() : false; //check if can move

      //bloc can move and it is grid tick update
      if (canMove && this.tickWaitCount === this.totalTickWait) {
        this.tickWaitCount = 0; //restart count
        this._arrowLogic("down", -1);
      }

      //if bloc can't move
      if (!canMove) {
        this._changeStatic(); //bloc become static
        this._fullLineLogic(); //reduce full line

        //check for another bloc or game over
        const canGetBlc = this._canGetBlc();
        canGetBlc ? this._getRdmBloc() : (this.isOver = true);
      }
      //update game or show game over depending state
      this.isOver ? this._toggleModal() : this._tick();
    }, 250); //choose by user on settings
  }

  //check if bloc can move on line - 1
  _blocCanMove() {
    let canMove = true;
    this.blocs.forEach((pos) => {
      if (!canMove) return;
      const [line, col, status] = this._spltLCS(pos); //get split pos
      if (line - 1 < 0) return (canMove = false); //bottom line check
      const nextLine = this._getBoxEl(line - 1, col); //check if next line as status static
      if (Number(nextLine.dataset.status) === 1) return (canMove = false);
    });
    return canMove;
  }

  _canGetBlc() {
    let isValid = true;
    //get two started lines
    for (let i = 1; i <= 2; i++) {
      const startcols = document
        .querySelector(`[data-is='line-${this.lineNum - i}']`)
        .querySelectorAll(`[data-is='col']`);
      startcols.forEach((col) => {
        if (Number(col.dataset.status) !== 0) isValid = false;
      });
    }
    return isValid;
  }

  _changeStatic() {
    this.blocs.forEach((pos) => {
      const [line, col, status, el] = this._getInfoFromPos(pos);
      el.dataset.status = 1;
    });
  }

  _fullLineLogic() {
    const fullL = this._isFullLine(); //check if full line
    fullL ? this._updteFllLine(fullL) : false; //update if it is
  }

  _isFullLine() {
    let fllLineArr = [];
    const lineEls = this._getLines(); //get lines
    //check if all col boxes are statics
    lineEls.forEach((line) => {
      const colEls = line.querySelectorAll('[data-status="1"]');
      if (colEls.length === this.colNum) fllLineArr.push(line.dataset.is);
    });
    //retrieve ascending arr with all full lines or false
    return fllLineArr.length !== 0 ? fllLineArr.reverse() : false;
  }

  _updteFllLine(arr) {
    this._remveFllLine(arr); //remove full lines
    this._updteRemaining(); //update grid for remain blocs
  }

  _remveFllLine(arr) {
    for (let i = 0; i < arr.length; i++) {
      //update score
      this._scoreUp();
      //get cols of a full line
      const colsEl = document
        .querySelector(`[data-is="${arr[i]}"] `)
        .querySelectorAll('[data-is="col"]');
      //change it to empty box
      colsEl.forEach((col) => this._setEmpty(col));
    }
  }

  _updteRemaining() {
    this._getAllPos();
    this._getStatics(); //get actual statics blocs
    const [...colsArr] = this._fltrByCols(); //filter all pos by entire cols (default is by line)
    //check every col
    colsArr.forEach((col, id) => {
      const [...spltItems] = col.split(","); //split all col boxes position
      //compare statics blocs list and cols
      for (let i = 0; i < this.statics.length; i++) {
        const statBlcID = spltItems.indexOf(this.statics[i]); //check if static bloc exist
        //it is the case
        if (statBlcID !== -1) {
          //check if static bloc can go on prev col pos
          for (let j = statBlcID - 1; j >= 0; j -= 1) {
            const [crrL, crrC, crrSt, crrEl, prevL, prevC, prevS, prevEl] = //get curr and prev col info
              this._getCurrAndPrevBlocInfo(spltItems[statBlcID], spltItems[j]);
            //prev bloc is empty, can update
            if (prevS === 0) {
              //update arr
              spltItems[j + 1] = `${crrL}.${crrC}.0`;
              spltItems[j] = `${prevL}.${prevC}.1`;
              //render DOM
              const [ctr, cfg, clss, stts] = this._getBlcData(crrEl);
              this._setBlcData(prevEl, ctr, cfg, clss, stts);
              this._setEmpty(crrEl);
            }
          }
        }
      }
    });
  }

  _getCurrAndPrevBlocInfo(currPos, prevPos) {
    const [currLine, currCol, currStatus, currEl] =
      this._getInfoFromPos(currPos);
    const [prevLine, prevCol, prevStatus, prevEl] =
      this._getInfoFromPos(prevPos);
    return [
      currLine,
      currCol,
      currStatus,
      currEl,
      prevLine,
      prevCol,
      prevStatus,
      prevEl,
    ];
  }
}
//SCORE LOGIC AND DOM CHANGE
class Score extends GameLogic {
  constructor() {
    super();
  }

  _initScore() {
    this.score = 0;
    this.scoreContent.textContent = this.score;
  }

  _scoreUp() {
    this.score++;
    this.scoreContent.textContent = this.score;
  }
}

class Settings extends Score {
  constructor() {
    super();
  }
  //get DOM settings values
  _getSettingsDOM() {
    const controller = this._getCheckedValue("settings-controller");
    const level = this._getCheckedValue("settings-level");
    //error msg if doesn't exit or apply
    return controller && level
      ? this._setupSettings(controller, level)
      : this.settingsAlertEl.classList.remove("d-none");
  }

  //get checked value
  _getCheckedValue(elementsName) {
    const inputs = document.getElementsByName(elementsName);
    let getOutput;
    inputs.forEach((inpt) => {
      if (inpt.checked) getOutput = inpt.value;
    });
    return getOutput;
  }

  //setup game with given settings
  _setupSettings(controller, level) {
    //show|hide controllers
    const controllerEl = document.getElementById("controllers");
    controller === "mobile"
      ? controllerEl.classList.remove("d-none")
      : controllerEl.classList.add("d-none");

    //set tick wait
    this.totalTickWait = Number(level);
    //run game
    this._runTetris();
  }
}

class Layout extends Settings {
  constructor() {
    super();
  }

  //global game start methods
  _start() {
    this.tickWaitCount = 0;
    this.settingsAlertEl.classList.add("d-none");
    this._initScore();
    this._createGrid();
    this.isOver = false;
    this._getRdmBloc();
    this._tick();
  }
  //when game run first time
  _runTetris() {
    this._toggleScore();
    this._toggleSettings();
    this._start();
  }
  //when restart
  _restartTetris() {
    this._toggleModal();
    this._removeGrid();
    this._start();
  }
  //go to settings
  _runSettings() {
    this._removeGrid();
    this._toggleSettings();
    this._toggleScore();
  }

  //create Tetris grid logic
  _createGrid() {
    //data-is => type of tag (line or col)
    //data-position => position of cols
    //data-status => actual state (0 = empty, 1 = static, 2 = bloc)

    //create columns according to colNum
    let colsTplte = "";
    for (let i = 0; i < this.colNum; i++) {
      colsTplte += `<div data-is='col' data-position = '${i}' data-status = '0' class="col h-100 border-left-1 border border-end-1 border-bottom-0 border-top-0 p-0"></div>`;
    }
    //render lineNum x colNum
    for (let i = 0; i < this.lineNum; i++) {
      this.entry.insertAdjacentHTML(
        "afterbegin",
        `<div data-is='line-${i}' class="line-dimension border border-1 border-start-0 border-end-0 row p-0 m-0">
              ${colsTplte}
         </div>`
      );
    }
    //different style for top lines (where new bloc spawnS)
    for (let i = 1; i <= 2; i++) {
      const lineEl = document.querySelector(
        `[data-is='line-${this.lineNum - i}']`
      );
      lineEl.classList.add("border-white");
      //lineEl.style.filter = "brightness(1.3)";
      const lineColsEl = lineEl.querySelectorAll(`[data-is='col']`);
      lineColsEl.forEach((col) => {
        col.classList.add("border-white");
      });
    }
  }
  //remove grid but keep controllers DOM
  _removeGrid() {
    while (
      this.entry.firstChild &&
      this.entry.firstChild.id !== "controllers"
    ) {
      this.entry.firstChild.remove();
    }
  }

  //hide|show settings
  _toggleSettings() {
    this.settingsEl.classList.toggle("d-none");
  }

  //hide|show controllers
  _toggleControllers() {
    this.controllerEl.classList.toggle("d-none");
  }

  //hide|show score
  _toggleScore() {
    this.scoreEl.classList.toggle("d-none");
  }

  //hide|show controllers
  _toggleModal() {
    this.modalBtn.click();
    this.modalContent.textContent = `Your score is ${this.score}. What do you want to do ?`;
  }
}

//TEMPLATE || INIT || RESTART
class Tetris extends Layout {
  constructor() {
    super();
    //VALUES
    this.lineNum = 18; //grid line num
    this.colNum = 12; //grid col num
    this.position = ""; //all boxes pos str
    this.blocs = ""; //bloc pos str
    this.statics; //static bloc pos str
    this._currCfg = ""; //str of actual bloc rotation
    this.score = 0; //score update when a line is full
    this.totalTickWait; //get from input
    this.tickWaitCount = 0; //count to match tickWaitSettings
    this.tickSpeed = 250; //one tick speed
    //DOM ELEMENTS
    this.settingsAlertEl = document.getElementById("settings-alert"); //show if miss settings
    this.settingsBtn = document.getElementById("settings-btn"); //apply settings, it is "start" btn
    this.scoreContent = document.getElementById("score-content"); //game score
    this.scoreEl = document.getElementById("score"); //score entry
    this.entry = document.getElementById("tetris"); //entry for grid
    this.modalBtn = document.getElementById("btn-modal"); //btn to launch modal
    this.modalContent = document.getElementById("modal-content"); //modal content
    this.modalRestartBtn = document.getElementById("modal-restart"); //restart game
    this.modalSettingsBtn = document.getElementById("modal-settings"); //go to settings
    this.settingsEl = document.getElementById("settings"); //settings entry
    this.controllerEl = document.getElementById("controllers"); //controllers entry
    //ELEMENT EVENT LISTENER
    //get settings
    this.settingsBtn.addEventListener("click", this._getSettingsDOM.bind(this));
    //modal restart event
    this.modalRestartBtn.addEventListener(
      "click",
      this._restartTetris.bind(this)
    );
    //modal go settings event
    this.modalSettingsBtn.addEventListener(
      "click",
      this._runSettings.bind(this)
    );
    //redirect controllers btn inpt to arrow|space event
    this.controllerEl.addEventListener("click", (e) => {
      if (!e.target.closest("button")) return;
      const btnID = e.target.closest("button").id;
      console.log(this.controllerEl.clicked);
      if (btnID === "controller-space") this._spaceHandler(e.code);
      if (btnID === "controller-left") this._arrowHandler("ArrowLeft");
      if (btnID === "controller-right") this._arrowHandler("ArrowRight");
      if (btnID === "controller-down") this._arrowHandler("ArrowDown");
    });
    //GLOBAL EVENT
    //get arrow input
    document.addEventListener("keydown", (e) => {
      if (e.key.includes("Arrow")) this._arrowHandler(e.key);
    });
    //get space input
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") this._spaceHandler(e.code);
    });
  }
}

const getTetris = new Tetris();
