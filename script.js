let valArray = [
  -5, -3, -4, -9, -7, -4, -3, -5, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3, 4, 9, 7, 4, 3, 5,
];
let sideBox = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
let blackKingCheck = false;
let whiteKingCheck = false;
let count = 0;
let lastVal = 0;
let lastBox = 0;
let box = 0;
let chance = 0;
let hasKingMove = false;
let blackKingMove = false;
let whiteRook1 = false;
let whiteRook2 = false;
let blackRook1 = false;
let blackRook2 = false;
let aBox = 0;
let allBlackLegal = new Array(200);
let allWhiteLegal = new Array(200);
let legalEquator = new Array(50);
let nonZeroCount = 0;
let isitaLegalMove = false;
let AddSubBox = 0;
let blackButtons = document.querySelectorAll(".black");
let whiteButtons = document.querySelectorAll(".white");
let imageBox = document.querySelectorAll("#piece");
let buttonBox = document.querySelectorAll("#square");
let moveSound = document.getElementById("moveSound");
let captureSound = document.getElementById("captureSound");
let checkSound = document.getElementById("checkSound");
let nullSquareCounter = 0;
let fenString = "";
function fenGenerator() {
  for (let fenLoop = 0; fenLoop < 64; fenLoop++) {
    if (valArray[fenLoop] == 0) nullSquareCounter++;
    else {
      if (nullSquareCounter != 0) fenString = fenString + nullSquareCounter;
      nullSquareCounter = 0;
    }
    if (valArray[fenLoop] == -5) fenString = fenString + "r";
    if (valArray[fenLoop] == -3) fenString = fenString + "n";
    if (valArray[fenLoop] == -4) fenString = fenString + "b";
    if (valArray[fenLoop] == -9) fenString = fenString + "q";
    if (valArray[fenLoop] == -7) fenString = fenString + "k";
    if (valArray[fenLoop] == -1) fenString = fenString + "p";
    if (valArray[fenLoop] == 5) fenString = fenString + "R";
    if (valArray[fenLoop] == 3) fenString = fenString + "N";
    if (valArray[fenLoop] == 4) fenString = fenString + "B";
    if (valArray[fenLoop] == 9) fenString = fenString + "Q";
    if (valArray[fenLoop] == 7) fenString = fenString + "K";
    if (valArray[fenLoop] == 1) fenString = fenString + "P";
    if ((fenLoop % 8) - 7 == 0 && fenLoop != 63)
      if (nullSquareCounter != 0) {
        fenString = fenString + nullSquareCounter + "/";
        nullSquareCounter = 0;
      } else fenString = fenString + "/";
  }
  if (chance % 2 == 0) fenString = fenString + " w ";
  else fenString = fenString + " b ";
  if (hasKingMove == false && whiteRook1 == false) fenString = fenString + "K";
  if (hasKingMove == false && whiteRook2 == false) fenString = fenString + "Q";
  if (blackKingMove == false && blackRook1 == false)
    fenString = fenString + "k";
  if (blackKingMove == false && blackRook2 == false)
    fenString = fenString + "q";
  fenString = fenString + " - ";
  document.querySelector(".fenBox").innerHTML = fenString;
}
let counter = 0;
let secondCounter = 0;
let blackMoveArray = new Array(200);
function allBlackMoves() {
  let tempoBox = box;
  for (let blackLoop = 0; blackLoop < 64; blackLoop++) {
    if (valArray[blackLoop] < 0) {
      box = blackLoop;
      bishopMove();
      pawnMove();
      knightMove();
      rookMove();
      queenMove();
      kingMove();
      for (
        let innerBlackLoop = counter;
        innerBlackLoop < nonZeroCount;
        innerBlackLoop++
      ) {
        blackMoveArray[innerBlackLoop] = legalEquator[innerBlackLoop];
      }
      counter = nonZeroCount;
    }
  }
  secondCounter = counter;
  counter = 0;
  box = tempoBox;
  nonZeroCount = 0;
}
let counter2 = 0;
let secondCounter2 = 0;
let whiteMoveArray = new Array(200);
function allWhiteMoves() {
  let tempoBox = box;
  for (let whiteLoop = 0; whiteLoop < 64; whiteLoop++) {
    if (valArray[whiteLoop] > 0) {
      box = whiteLoop;
      bishopMove();
      pawnMove();
      knightMove();
      rookMove();
      queenMove();
      kingMove();
      for (
        let innerWhiteLoop = counter2;
        innerWhiteLoop < nonZeroCount;
        innerWhiteLoop++
      ) {
        whiteMoveArray[innerWhiteLoop] = legalEquator[innerWhiteLoop];
      }
      counter2 = nonZeroCount;
    }
  }
  secondCounter2 = counter2;
  counter2 = 0;
  box = tempoBox;
  nonZeroCount = 0;
}
function bishopMove() {
  if (valArray[box] == 4) {
    for (let loop = 0; loop < 4; loop++) {
      AddSubBox = box;
      for (let innerLoop = 0; innerLoop < 50; innerLoop++) {
        if (
          loop == 0 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 7;
          if (valArray[AddSubBox] > 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] < 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 1 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 9;
          if (valArray[AddSubBox] > 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] < 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 2 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 9;
          if (valArray[AddSubBox] > 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] < 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 3 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56
        ) {
          AddSubBox = AddSubBox + 7;
          if (valArray[AddSubBox] > 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] < 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
      }
    }
  }
  if (valArray[box] == -4) {
    for (let loop = 0; loop < 4; loop++) {
      AddSubBox = box;
      for (let innerLoop = 0; innerLoop < 50; innerLoop++) {
        if (
          loop == 0 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 7;
          if (valArray[AddSubBox] < 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] > 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 1 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 9;
          if (valArray[AddSubBox] < 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] > 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 2 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 9;
          if (valArray[AddSubBox] < 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] > 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 3 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56
        ) {
          AddSubBox = AddSubBox + 7;
          if (valArray[AddSubBox] < 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] > 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
      }
    }
  }
}
function pawnMove() {
  if (
    valArray[box] == 1 &&
    (box == 48 ||
      box == 49 ||
      box == 50 ||
      box == 51 ||
      box == 52 ||
      box == 53 ||
      box == 54 ||
      box == 55)
  ) {
    if (valArray[box - 8] == 0) {
      legalEquator[nonZeroCount++] = box - 8;
      if (valArray[box - 16] == 0) {
        legalEquator[nonZeroCount++] = box - 16;
      }
    }
    if (
      valArray[box - 7] < 0 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box - 7;
    }

    if (
      valArray[box - 9] < 0 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56
    ) {
      legalEquator[nonZeroCount++] = box - 9;
    }
  } else if (valArray[box] == 1) {
    if (valArray[box - 8] == 0) {
      legalEquator[nonZeroCount++] = box - 8;
    }
    if (
      valArray[box - 7] < 0 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box - 7;
    }

    if (
      valArray[box - 9] < 0 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56
    ) {
      legalEquator[nonZeroCount++] = box - 9;
    }
  }
  if (
    valArray[box] == -1 &&
    (box == 8 ||
      box == 9 ||
      box == 10 ||
      box == 11 ||
      box == 12 ||
      box == 13 ||
      box == 14 ||
      box == 15)
  ) {
    if (valArray[box + 8] == 0) {
      legalEquator[nonZeroCount++] = box + 8;
      if (valArray[box + 16] == 0) {
        legalEquator[nonZeroCount++] = box + 16;
      }
    }
    if (
      valArray[box + 7] > 0 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56
    ) {
      legalEquator[nonZeroCount++] = box + 7;
    }

    if (
      valArray[box + 9] > 0 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box + 9;
    }
  } else if (valArray[box] == -1) {
    if (valArray[box + 8] == 0) {
      legalEquator[nonZeroCount++] = box + 8;
    }
    if (
      valArray[box + 7] > 0 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56
    ) {
      legalEquator[nonZeroCount++] = box + 7;
    }

    if (
      valArray[box + 9] > 0 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box + 9;
    }
  }
}
function knightMove() {
  if (valArray[box] == 3) {
    for (let loop = 0; loop < 8; loop++) {
      if (
        loop == 0 &&
        box != 7 &&
        box != 15 &&
        box != 23 &&
        box != 31 &&
        box != 39 &&
        box != 47 &&
        box != 55 &&
        box != 63 &&
        box != 0 &&
        box != 1 &&
        box != 2 &&
        box != 3 &&
        box != 4 &&
        box != 5 &&
        box != 6 &&
        box != 8 &&
        box != 9 &&
        box != 10 &&
        box != 11 &&
        box != 12 &&
        box != 13 &&
        box != 14
      ) {
        if (valArray[box - 15] <= 0) {
          legalEquator[nonZeroCount++] = box - 15;
        }
      }
      if (
        loop == 1 &&
        box != 7 &&
        box != 15 &&
        box != 23 &&
        box != 31 &&
        box != 39 &&
        box != 47 &&
        box != 55 &&
        box != 63 &&
        box != 0 &&
        box != 1 &&
        box != 2 &&
        box != 3 &&
        box != 4 &&
        box != 5 &&
        box != 6 &&
        box != 14 &&
        box != 22 &&
        box != 30 &&
        box != 38 &&
        box != 46 &&
        box != 54 &&
        box != 62
      ) {
        if (valArray[box - 6] <= 0) {
          legalEquator[nonZeroCount++] = box - 6;
        }
      }
      if (
        loop == 2 &&
        box != 0 &&
        box != 8 &&
        box != 16 &&
        box != 24 &&
        box != 32 &&
        box != 40 &&
        box != 48 &&
        box != 56 &&
        box != 0 &&
        box != 1 &&
        box != 2 &&
        box != 3 &&
        box != 4 &&
        box != 5 &&
        box != 6 &&
        box != 8 &&
        box != 9 &&
        box != 10 &&
        box != 11 &&
        box != 12 &&
        box != 13 &&
        box != 14 &&
        box != 15
      ) {
        if (valArray[box - 17] <= 0) {
          legalEquator[nonZeroCount++] = box - 17;
        }
      }
      if (
        loop == 3 &&
        box != 0 &&
        box != 8 &&
        box != 16 &&
        box != 24 &&
        box != 32 &&
        box != 40 &&
        box != 48 &&
        box != 56 &&
        box != 0 &&
        box != 1 &&
        box != 2 &&
        box != 3 &&
        box != 4 &&
        box != 5 &&
        box != 6 &&
        box != 1 &&
        box != 9 &&
        box != 17 &&
        box != 25 &&
        box != 33 &&
        box != 41 &&
        box != 49 &&
        box != 57
      ) {
        if (valArray[box - 10] <= 0) {
          legalEquator[nonZeroCount++] = box - 10;
        }
      }
      if (
        loop == 4 &&
        box != 7 &&
        box != 15 &&
        box != 23 &&
        box != 31 &&
        box != 39 &&
        box != 47 &&
        box != 55 &&
        box != 63 &&
        box != 56 &&
        box != 57 &&
        box != 58 &&
        box != 59 &&
        box != 60 &&
        box != 61 &&
        box != 62 &&
        box != 48 &&
        box != 49 &&
        box != 50 &&
        box != 51 &&
        box != 52 &&
        box != 53 &&
        box != 54
      ) {
        if (valArray[box + 17] <= 0) {
          legalEquator[nonZeroCount++] = box + 17;
        }
      }
      if (
        loop == 5 &&
        box != 7 &&
        box != 15 &&
        box != 23 &&
        box != 31 &&
        box != 39 &&
        box != 47 &&
        box != 55 &&
        box != 63 &&
        box != 56 &&
        box != 57 &&
        box != 58 &&
        box != 59 &&
        box != 60 &&
        box != 61 &&
        box != 62 &&
        box != 6 &&
        box != 14 &&
        box != 22 &&
        box != 30 &&
        box != 38 &&
        box != 46 &&
        box != 54
      ) {
        if (valArray[box + 10] <= 0) {
          legalEquator[nonZeroCount++] = box + 10;
        }
      }
      if (
        loop == 6 &&
        box != 0 &&
        box != 8 &&
        box != 16 &&
        box != 24 &&
        box != 32 &&
        box != 40 &&
        box != 48 &&
        box != 56 &&
        box != 56 &&
        box != 57 &&
        box != 58 &&
        box != 59 &&
        box != 60 &&
        box != 61 &&
        box != 62 &&
        box != 63 &&
        box != 49 &&
        box != 50 &&
        box != 51 &&
        box != 52 &&
        box != 53 &&
        box != 54 &&
        box != 55
      ) {
        if (valArray[box + 15] <= 0) {
          legalEquator[nonZeroCount++] = box + 15;
        }
      }
      if (
        loop == 7 &&
        box != 0 &&
        box != 8 &&
        box != 16 &&
        box != 24 &&
        box != 32 &&
        box != 40 &&
        box != 48 &&
        box != 56 &&
        box != 56 &&
        box != 57 &&
        box != 58 &&
        box != 59 &&
        box != 60 &&
        box != 61 &&
        box != 62 &&
        box != 63 &&
        box != 1 &&
        box != 9 &&
        box != 17 &&
        box != 25 &&
        box != 33 &&
        box != 41 &&
        box != 49
      ) {
        if (valArray[box + 6] <= 0) {
          legalEquator[nonZeroCount++] = box + 6;
        }
      }
    }
  }
  if (valArray[box] == -3) {
    for (let loop = 0; loop < 8; loop++) {
      if (
        loop == 0 &&
        box != 7 &&
        box != 15 &&
        box != 23 &&
        box != 31 &&
        box != 39 &&
        box != 47 &&
        box != 55 &&
        box != 63 &&
        box != 0 &&
        box != 1 &&
        box != 2 &&
        box != 3 &&
        box != 4 &&
        box != 5 &&
        box != 6 &&
        box != 8 &&
        box != 9 &&
        box != 10 &&
        box != 11 &&
        box != 12 &&
        box != 13 &&
        box != 14
      ) {
        if (valArray[box - 15] >= 0) {
          legalEquator[nonZeroCount++] = box - 15;
        }
      }
      if (
        loop == 1 &&
        box != 7 &&
        box != 15 &&
        box != 23 &&
        box != 31 &&
        box != 39 &&
        box != 47 &&
        box != 55 &&
        box != 63 &&
        box != 0 &&
        box != 1 &&
        box != 2 &&
        box != 3 &&
        box != 4 &&
        box != 5 &&
        box != 6 &&
        box != 14 &&
        box != 22 &&
        box != 30 &&
        box != 38 &&
        box != 46 &&
        box != 54 &&
        box != 62
      ) {
        if (valArray[box - 6] >= 0) {
          legalEquator[nonZeroCount++] = box - 6;
        }
      }
      if (
        loop == 2 &&
        box != 0 &&
        box != 8 &&
        box != 16 &&
        box != 24 &&
        box != 32 &&
        box != 40 &&
        box != 48 &&
        box != 56 &&
        box != 0 &&
        box != 1 &&
        box != 2 &&
        box != 3 &&
        box != 4 &&
        box != 5 &&
        box != 6 &&
        box != 8 &&
        box != 9 &&
        box != 10 &&
        box != 11 &&
        box != 12 &&
        box != 13 &&
        box != 14 &&
        box != 15
      ) {
        if (valArray[box - 17] >= 0) {
          legalEquator[nonZeroCount++] = box - 17;
        }
      }
      if (
        loop == 3 &&
        box != 0 &&
        box != 8 &&
        box != 16 &&
        box != 24 &&
        box != 32 &&
        box != 40 &&
        box != 48 &&
        box != 56 &&
        box != 0 &&
        box != 1 &&
        box != 2 &&
        box != 3 &&
        box != 4 &&
        box != 5 &&
        box != 6 &&
        box != 1 &&
        box != 9 &&
        box != 17 &&
        box != 25 &&
        box != 33 &&
        box != 41 &&
        box != 49 &&
        box != 57
      ) {
        if (valArray[box - 10] >= 0) {
          legalEquator[nonZeroCount++] = box - 10;
        }
      }
      if (
        loop == 4 &&
        box != 7 &&
        box != 15 &&
        box != 23 &&
        box != 31 &&
        box != 39 &&
        box != 47 &&
        box != 55 &&
        box != 63 &&
        box != 56 &&
        box != 57 &&
        box != 58 &&
        box != 59 &&
        box != 60 &&
        box != 61 &&
        box != 62 &&
        box != 48 &&
        box != 49 &&
        box != 50 &&
        box != 51 &&
        box != 52 &&
        box != 53 &&
        box != 54
      ) {
        if (valArray[box + 17] >= 0) {
          legalEquator[nonZeroCount++] = box + 17;
        }
      }
      if (
        loop == 5 &&
        box != 7 &&
        box != 15 &&
        box != 23 &&
        box != 31 &&
        box != 39 &&
        box != 47 &&
        box != 55 &&
        box != 63 &&
        box != 56 &&
        box != 57 &&
        box != 58 &&
        box != 59 &&
        box != 60 &&
        box != 61 &&
        box != 62 &&
        box != 6 &&
        box != 14 &&
        box != 22 &&
        box != 30 &&
        box != 38 &&
        box != 46 &&
        box != 54
      ) {
        if (valArray[box + 10] >= 0) {
          legalEquator[nonZeroCount++] = box + 10;
        }
      }
      if (
        loop == 6 &&
        box != 0 &&
        box != 8 &&
        box != 16 &&
        box != 24 &&
        box != 32 &&
        box != 40 &&
        box != 48 &&
        box != 56 &&
        box != 56 &&
        box != 57 &&
        box != 58 &&
        box != 59 &&
        box != 60 &&
        box != 61 &&
        box != 62 &&
        box != 63 &&
        box != 49 &&
        box != 50 &&
        box != 51 &&
        box != 52 &&
        box != 53 &&
        box != 54 &&
        box != 55
      ) {
        if (valArray[box + 15] >= 0) {
          legalEquator[nonZeroCount++] = box + 15;
        }
      }
      if (
        loop == 7 &&
        box != 0 &&
        box != 8 &&
        box != 16 &&
        box != 24 &&
        box != 32 &&
        box != 40 &&
        box != 48 &&
        box != 56 &&
        box != 56 &&
        box != 57 &&
        box != 58 &&
        box != 59 &&
        box != 60 &&
        box != 61 &&
        box != 62 &&
        box != 63 &&
        box != 1 &&
        box != 9 &&
        box != 17 &&
        box != 25 &&
        box != 33 &&
        box != 41 &&
        box != 49
      ) {
        if (valArray[box + 6] >= 0) {
          legalEquator[nonZeroCount++] = box + 6;
        }
      }
    }
  }
}
function rookMove() {
  if (valArray[box] == 5) {
    for (let loop = 0; loop < 4; loop++) {
      AddSubBox = box;
      for (let innerLoop = 0; innerLoop < 50; innerLoop++) {
        if (
          loop == 0 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 8;
          if (valArray[AddSubBox] > 0) break;
          else if (
            valArray[AddSubBox] < 0 ||
            AddSubBox == 0 ||
            AddSubBox == 1 ||
            AddSubBox == 2 ||
            AddSubBox == 3 ||
            AddSubBox == 4 ||
            AddSubBox == 5 ||
            AddSubBox == 6 ||
            AddSubBox == 7
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 1 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 8;
          if (valArray[AddSubBox] > 0) break;
          else if (
            valArray[AddSubBox] < 0 ||
            AddSubBox == 56 ||
            AddSubBox == 57 ||
            AddSubBox == 58 ||
            AddSubBox == 59 ||
            AddSubBox == 60 ||
            AddSubBox == 61 ||
            AddSubBox == 62 ||
            AddSubBox == 63
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 2 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 1;
          if (valArray[AddSubBox] > 0) break;
          else if (
            valArray[AddSubBox] < 0 ||
            AddSubBox == 7 ||
            AddSubBox == 15 ||
            AddSubBox == 23 ||
            AddSubBox == 31 ||
            AddSubBox == 39 ||
            AddSubBox == 47 ||
            AddSubBox == 55 ||
            AddSubBox == 63
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 3 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56
        ) {
          AddSubBox = AddSubBox - 1;
          if (valArray[AddSubBox] > 0) break;
          else if (
            valArray[AddSubBox] < 0 ||
            AddSubBox == 0 ||
            AddSubBox == 8 ||
            AddSubBox == 16 ||
            AddSubBox == 24 ||
            AddSubBox == 32 ||
            AddSubBox == 40 ||
            AddSubBox == 48 ||
            AddSubBox == 56
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
      }
    }
  }
  if (valArray[box] == -5) {
    for (let loop = 0; loop < 4; loop++) {
      AddSubBox = box;
      for (let innerLoop = 0; innerLoop < 50; innerLoop++) {
        if (
          loop == 0 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 8;
          if (valArray[AddSubBox] < 0) break;
          else if (
            valArray[AddSubBox] > 0 ||
            AddSubBox == 0 ||
            AddSubBox == 1 ||
            AddSubBox == 2 ||
            AddSubBox == 3 ||
            AddSubBox == 4 ||
            AddSubBox == 5 ||
            AddSubBox == 6 ||
            AddSubBox == 7
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 1 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 8;
          if (valArray[AddSubBox] < 0) break;
          else if (
            valArray[AddSubBox] > 0 ||
            AddSubBox == 56 ||
            AddSubBox == 57 ||
            AddSubBox == 58 ||
            AddSubBox == 59 ||
            AddSubBox == 60 ||
            AddSubBox == 61 ||
            AddSubBox == 62 ||
            AddSubBox == 63
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 2 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 1;
          if (valArray[AddSubBox] < 0) break;
          else if (
            valArray[AddSubBox] > 0 ||
            AddSubBox == 7 ||
            AddSubBox == 15 ||
            AddSubBox == 23 ||
            AddSubBox == 31 ||
            AddSubBox == 39 ||
            AddSubBox == 47 ||
            AddSubBox == 55 ||
            AddSubBox == 63
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 3 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56
        ) {
          AddSubBox = AddSubBox - 1;
          if (valArray[AddSubBox] < 0) break;
          else if (
            valArray[AddSubBox] > 0 ||
            AddSubBox == 0 ||
            AddSubBox == 8 ||
            AddSubBox == 16 ||
            AddSubBox == 24 ||
            AddSubBox == 32 ||
            AddSubBox == 40 ||
            AddSubBox == 48 ||
            AddSubBox == 56
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
      }
    }
  }
}
function queenMove() {
  if (valArray[box] == 9) {
    for (let loop = 0; loop < 4; loop++) {
      AddSubBox = box;
      for (let innerLoop = 0; innerLoop < 50; innerLoop++) {
        if (
          loop == 0 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 8;
          if (valArray[AddSubBox] > 0) break;
          else if (
            valArray[AddSubBox] < 0 ||
            AddSubBox == 0 ||
            AddSubBox == 1 ||
            AddSubBox == 2 ||
            AddSubBox == 3 ||
            AddSubBox == 4 ||
            AddSubBox == 5 ||
            AddSubBox == 6 ||
            AddSubBox == 7
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 1 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 8;
          if (valArray[AddSubBox] > 0) break;
          else if (
            valArray[AddSubBox] < 0 ||
            AddSubBox == 56 ||
            AddSubBox == 57 ||
            AddSubBox == 58 ||
            AddSubBox == 59 ||
            AddSubBox == 60 ||
            AddSubBox == 61 ||
            AddSubBox == 62 ||
            AddSubBox == 63
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 2 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 1;
          if (valArray[AddSubBox] > 0) break;
          else if (
            valArray[AddSubBox] < 0 ||
            AddSubBox == 7 ||
            AddSubBox == 15 ||
            AddSubBox == 23 ||
            AddSubBox == 31 ||
            AddSubBox == 39 ||
            AddSubBox == 47 ||
            AddSubBox == 55 ||
            AddSubBox == 63
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 3 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56
        ) {
          AddSubBox = AddSubBox - 1;
          if (valArray[AddSubBox] > 0) break;
          else if (
            valArray[AddSubBox] < 0 ||
            AddSubBox == 0 ||
            AddSubBox == 8 ||
            AddSubBox == 16 ||
            AddSubBox == 24 ||
            AddSubBox == 32 ||
            AddSubBox == 40 ||
            AddSubBox == 48 ||
            AddSubBox == 56
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
      }
    }
  }
  if (valArray[box] == 9) {
    for (let loop = 0; loop < 4; loop++) {
      AddSubBox = box;
      for (let innerLoop = 0; innerLoop < 50; innerLoop++) {
        if (
          loop == 0 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 7;
          if (valArray[AddSubBox] > 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] < 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 1 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 9;
          if (valArray[AddSubBox] > 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] < 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 2 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 9;
          if (valArray[AddSubBox] > 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] < 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 3 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56
        ) {
          AddSubBox = AddSubBox + 7;
          if (valArray[AddSubBox] > 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] < 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
      }
    }
  }
  if (valArray[box] == -9) {
    for (let loop = 0; loop < 4; loop++) {
      AddSubBox = box;
      for (let innerLoop = 0; innerLoop < 50; innerLoop++) {
        if (
          loop == 0 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 8;
          if (valArray[AddSubBox] < 0) break;
          else if (
            valArray[AddSubBox] > 0 ||
            AddSubBox == 0 ||
            AddSubBox == 1 ||
            AddSubBox == 2 ||
            AddSubBox == 3 ||
            AddSubBox == 4 ||
            AddSubBox == 5 ||
            AddSubBox == 6 ||
            AddSubBox == 7
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 1 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 8;
          if (valArray[AddSubBox] < 0) break;
          else if (
            valArray[AddSubBox] > 0 ||
            AddSubBox == 56 ||
            AddSubBox == 57 ||
            AddSubBox == 58 ||
            AddSubBox == 59 ||
            AddSubBox == 60 ||
            AddSubBox == 61 ||
            AddSubBox == 62 ||
            AddSubBox == 63
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 2 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 1;
          if (valArray[AddSubBox] < 0) break;
          else if (
            valArray[AddSubBox] > 0 ||
            AddSubBox == 7 ||
            AddSubBox == 15 ||
            AddSubBox == 23 ||
            AddSubBox == 31 ||
            AddSubBox == 39 ||
            AddSubBox == 47 ||
            AddSubBox == 55 ||
            AddSubBox == 63
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 3 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56
        ) {
          AddSubBox = AddSubBox - 1;
          if (valArray[AddSubBox] < 0) break;
          else if (
            valArray[AddSubBox] > 0 ||
            AddSubBox == 0 ||
            AddSubBox == 8 ||
            AddSubBox == 16 ||
            AddSubBox == 24 ||
            AddSubBox == 32 ||
            AddSubBox == 40 ||
            AddSubBox == 48 ||
            AddSubBox == 56
          ) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
      }
    }
  }
  if (valArray[box] == -9) {
    for (let loop = 0; loop < 4; loop++) {
      AddSubBox = box;
      for (let innerLoop = 0; innerLoop < 50; innerLoop++) {
        if (
          loop == 0 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 7;
          if (valArray[AddSubBox] < 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] > 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 1 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56 &&
          box != 0 &&
          box != 1 &&
          box != 2 &&
          box != 3 &&
          box != 4 &&
          box != 5 &&
          box != 6 &&
          box != 7
        ) {
          AddSubBox = AddSubBox - 9;
          if (valArray[AddSubBox] < 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] > 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 2 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63 &&
          box != 7 &&
          box != 15 &&
          box != 23 &&
          box != 31 &&
          box != 39 &&
          box != 47 &&
          box != 55 &&
          box != 63
        ) {
          AddSubBox = AddSubBox + 9;
          if (valArray[AddSubBox] < 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] > 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
        if (
          loop == 3 &&
          box != 56 &&
          box != 57 &&
          box != 58 &&
          box != 59 &&
          box != 60 &&
          box != 61 &&
          box != 62 &&
          box != 63 &&
          box != 0 &&
          box != 8 &&
          box != 16 &&
          box != 24 &&
          box != 32 &&
          box != 40 &&
          box != 48 &&
          box != 56
        ) {
          AddSubBox = AddSubBox + 7;
          if (valArray[AddSubBox] < 0) {
            break;
          } else if (sideBox[AddSubBox] == 1 || valArray[AddSubBox] > 0) {
            legalEquator[nonZeroCount++] = AddSubBox;
            break;
          } else {
            legalEquator[nonZeroCount++] = AddSubBox;
          }
        }
      }
    }
  }
}
function kingMove() {
  if (valArray[box] == 7) {
    if (
      valArray[box - 8] <= 0 &&
      box != 0 &&
      box != 1 &&
      box != 2 &&
      box != 3 &&
      box != 4 &&
      box != 5 &&
      box != 6 &&
      box != 7
    ) {
      legalEquator[nonZeroCount++] = box - 8;
    }
    if (
      valArray[box - 7] <= 0 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63 &&
      box != 1 &&
      box != 2 &&
      box != 3 &&
      box != 4 &&
      box != 5 &&
      box != 6 &&
      box != 7
    ) {
      legalEquator[nonZeroCount++] = box - 7;
    }
    if (
      valArray[box - 9] <= 0 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56 &&
      box != 1 &&
      box != 2 &&
      box != 3 &&
      box != 4 &&
      box != 5 &&
      box != 6 &&
      box != 7
    ) {
      legalEquator[nonZeroCount++] = box - 9;
    }
    if (
      valArray[box + 1] <= 0 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box + 1;
    }
    if (
      valArray[box - 1] <= 0 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56
    ) {
      legalEquator[nonZeroCount++] = box - 1;
    }
    if (
      valArray[box + 8] <= 0 &&
      box != 56 &&
      box != 57 &&
      box != 58 &&
      box != 59 &&
      box != 60 &&
      box != 61 &&
      box != 62 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box + 8;
    }
    if (
      valArray[box + 7] <= 0 &&
      box != 56 &&
      box != 57 &&
      box != 58 &&
      box != 59 &&
      box != 60 &&
      box != 61 &&
      box != 62 &&
      box != 63 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56
    ) {
      legalEquator[nonZeroCount++] = box + 7;
    }
    if (
      valArray[box + 9] <= 0 &&
      box != 56 &&
      box != 57 &&
      box != 58 &&
      box != 59 &&
      box != 60 &&
      box != 61 &&
      box != 62 &&
      box != 63 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box + 9;
    }
    if (
      hasKingMove == false &&
      valArray[61] == 0 &&
      valArray[62] == 0 &&
      valArray[63] == 5 &&
      whiteRook1 == false
    ) {
      buttonBox[62].style.backgroundColor = "rgb(217,52,52)";
      legalEquator[nonZeroCount++] = 62;
    }
    if (
      hasKingMove == false &&
      valArray[59] == 0 &&
      valArray[58] == 0 &&
      valArray[57] == 0 &&
      valArray[56] == 5 &&
      whiteRook2 == false
    ) {
      buttonBox[58].style.backgroundColor = "rgb(217,52,52)";
      legalEquator[nonZeroCount++] = 58;
    }
  }
  if (valArray[box] == -7) {
    if (
      valArray[box - 8] >= 0 &&
      box != 0 &&
      box != 1 &&
      box != 2 &&
      box != 3 &&
      box != 4 &&
      box != 5 &&
      box != 6 &&
      box != 7
    ) {
      legalEquator[nonZeroCount++] = box - 8;
    }
    if (
      valArray[box - 7] >= 0 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63 &&
      box != 1 &&
      box != 2 &&
      box != 3 &&
      box != 4 &&
      box != 5 &&
      box != 6 &&
      box != 7
    ) {
      legalEquator[nonZeroCount++] = box - 7;
    }
    if (
      valArray[box - 9] >= 0 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56 &&
      box != 1 &&
      box != 2 &&
      box != 3 &&
      box != 4 &&
      box != 5 &&
      box != 6 &&
      box != 7
    ) {
      legalEquator[nonZeroCount++] = box - 9;
    }
    if (
      valArray[box + 1] >= 0 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box + 1;
    }
    if (
      valArray[box - 1] >= 0 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56
    ) {
      legalEquator[nonZeroCount++] = box - 1;
    }
    if (
      valArray[box + 8] >= 0 &&
      box != 56 &&
      box != 57 &&
      box != 58 &&
      box != 59 &&
      box != 60 &&
      box != 61 &&
      box != 62 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box + 8;
    }
    if (
      valArray[box + 7] >= 0 &&
      box != 56 &&
      box != 57 &&
      box != 58 &&
      box != 59 &&
      box != 60 &&
      box != 61 &&
      box != 62 &&
      box != 63 &&
      box != 0 &&
      box != 8 &&
      box != 16 &&
      box != 24 &&
      box != 32 &&
      box != 40 &&
      box != 48 &&
      box != 56
    ) {
      legalEquator[nonZeroCount++] = box + 7;
    }
    if (
      valArray[box + 9] >= 0 &&
      box != 56 &&
      box != 57 &&
      box != 58 &&
      box != 59 &&
      box != 60 &&
      box != 61 &&
      box != 62 &&
      box != 63 &&
      box != 7 &&
      box != 15 &&
      box != 23 &&
      box != 31 &&
      box != 39 &&
      box != 47 &&
      box != 55 &&
      box != 63
    ) {
      legalEquator[nonZeroCount++] = box + 9;
    }
    if (
      blackKingMove == false &&
      blackRook1 == false &&
      valArray[5] == 0 &&
      valArray[6] == 0 &&
      valArray[7] == -5
    ) {
      buttonBox[6].style.backgroundColor = "rgb(232,90,90)";
      legalEquator[nonZeroCount++] = 6;
    }
    if (
      blackKingMove == false &&
      blackRook2 == false &&
      valArray[3] == 0 &&
      valArray[2] == 0 &&
      valArray[1] == 0 &&
      valArray[0] == -5
    ) {
      buttonBox[2].style.backgroundColor = "rgb(232,90,90)";
      legalEquator[nonZeroCount++] = 2;
    }
  }
}
function whiteMoveCompile() {
  allWhiteMoves();
  buttonBox[lastBox].style.backgroundColor = "rgb(224,208,25)";
  buttonBox[box].style.backgroundColor = "rgb(224,208,25)";
  for (let a = 0; a < secondCounter2; a++) {
    if (valArray[whiteMoveArray[a]] == -7) {
      blackKingCheck = true;
      break;
    } else {
      blackKingCheck = false;
    }
  }
}
function blackMoveCompile() {
  allBlackMoves();
  buttonBox[lastBox].style.backgroundColor = "rgb(224,208,25)";
  buttonBox[box].style.backgroundColor = "rgb(224,208,25)";
  for (let a = 0; a < secondCounter; a++) {
    if (valArray[blackMoveArray[a]] == 7) {
      whiteKingCheck = true;
      break;
    } else {
      whiteKingCheck = false;
    }
  }
}
let tempoStorer = new Array(200);
let tempoCounter = 0;
function legalMoves() {
  kingMove();
  bishopMove();
  knightMove();
  pawnMove();
  rookMove();
  queenMove();
  
    for (let someThing = 0; someThing < nonZeroCount; someThing++) {
      if (buttonBox[legalEquator[someThing]].className == "black")
        buttonBox[legalEquator[someThing]].style.backgroundColor =
          "rgb(217,52,52)";
      else
        buttonBox[legalEquator[someThing]].style.backgroundColor =
          "rgb(232,90,90)";
    }

  isitaLegalMove = false;
}
function legalMoveMade() {
  for (let some = 0; some < nonZeroCount; some++) {
    if (legalEquator[some] == box) {
      isitaLegalMove = true;
      legalEquator[some] = 0;
    }
  }
  if (isitaLegalMove == false) {
    count = 0;
    lastBox = box;
  }
  nonZeroCount = 0;
}
function pieceMovement() {
  if (count % 2 == 1 && chance % 2 == 0 && valArray[box] > 0) {
    lastBox = box;
    buttonBox[box].style.backgroundColor = "rgb(224,208,25)";
    lastVal = valArray[box];
    legalMoves();
  } else if (count % 2 == 1 && chance % 2 == 1 && valArray[box] < 0) {
    lastBox = box;
    buttonBox[box].style.backgroundColor = "rgb(224,208,25)";
    lastVal = valArray[box];
    legalMoves();
  } else {
    isitaLegalMove = false;
  }
  if (count % 2 == 0) {
    for (let i = 0; i < blackButtons.length; i++) {
      blackButtons[i].style.backgroundColor = "#A97A65";
      whiteButtons[i].style.backgroundColor = "#F1D9C0";
    }
    legalMoveMade();
    if (lastBox == box) {
      count = 0;
      if (whiteKingCheck) {
        for (let b = 0; b < 64; b++) {
          if (valArray[b] == 7) {
            buttonBox[b].style.backgroundColor = "red";
          }
        }
      }
      if (blackKingCheck) {
        for (let b = 0; b < 64; b++) {
          if (valArray[b] == -7) {
            buttonBox[b].style.backgroundColor = "red";
          }
        }
      }
    } else {
      if (
        valArray[lastBox] == 7 &&
        valArray[61] == 0 &&
        valArray[62] == 0 &&
        valArray[63] == 5 &&
        lastBox == 60 &&
        box == 62 &&
        hasKingMove == false &&
        whiteRook1 == false
      ) {
        buttonBox[60].style.backgroundColor = "rgb(224,208,25)";
        buttonBox[62].style.backgroundColor = "rgb(224,208,25)";
        imageBox[60].src = "Images/transparent.png";
        imageBox[63].src = "Images/transparent.png";
        valArray[60] = 0;
        valArray[63] = 0;
        valArray[61] = 5;
        valArray[62] = 7;
        imageBox[61].src = "Images/LiWR.png";
        imageBox[62].src = "Images/LiWK.png";
        chance++;
        moveSound.play();
      } else if (
        valArray[lastBox] == -7 &&
        valArray[5] == 0 &&
        valArray[6] == 0 &&
        valArray[7] == -5 &&
        lastBox == 4 &&
        box == 6 &&
        blackKingMove == false &&
        blackRook1 == false
      ) {
        buttonBox[4].style.backgroundColor = "rgb(224,208,25)";
        buttonBox[6].style.backgroundColor = "rgb(224,208,25)";
        imageBox[7].src = "Images/transparent.png";
        imageBox[4].src = "Images/transparent.png";
        valArray[7] = 0;
        valArray[4] = 0;
        valArray[5] = -5;
        valArray[6] = -7;

        imageBox[5].src = "Images/LiBR.png";
        imageBox[6].src = "Images/LiBK.png";

        chance++;
        moveSound.play();
      } else if (
        valArray[lastBox] == 7 &&
        valArray[59] == 0 &&
        valArray[58] == 0 &&
        valArray[57] == 0 &&
        valArray[56] == 5 &&
        lastBox == 60 &&
        box == 58 &&
        hasKingMove == false &&
        whiteRook2 == false
      ) {
        buttonBox[58].style.backgroundColor = "rgb(224,208,25)";
        buttonBox[60].style.backgroundColor = "rgb(224,208,25)";
        imageBox[56].src = "Images/transparent.png";
        imageBox[57].src = "Images/transparent.png";
        imageBox[60].src = "Images/transparent.png";
        valArray[56] = 0;
        valArray[57] = 0;
        valArray[60] = 0;
        valArray[59] = 5;
        valArray[58] = 7;

        imageBox[59].src = "Images/LiWR.png";
        imageBox[58].src = "Images/LiWK.png";

        chance++;
        moveSound.play();
      } else if (
        valArray[lastBox] == -7 &&
        valArray[1] == 0 &&
        valArray[2] == 0 &&
        valArray[3] == 0 &&
        valArray[0] == -5 &&
        lastBox == 4 &&
        box == 2 &&
        blackKingMove == false &&
        blackRook2 == false
      ) {
        buttonBox[2].style.backgroundColor = "rgb(224,208,25)";
        buttonBox[4].style.backgroundColor = "rgb(224,208,25)";
        imageBox[0].src = "Images/transparent.png";
        imageBox[1].src = "Images/transparent.png";
        imageBox[4].src = "Images/transparent.png";
        valArray[0] = 0;
        valArray[1] = 0;
        valArray[4] = 0;
        valArray[3] = -5;
        valArray[2] = -7;
        imageBox[3].src = "Images/LiBR.png";
        imageBox[2].src = "Images/LiBK.png";
        chance++;
        moveSound.play();
      } else {
        if (lastVal == 7) hasKingMove = true;
        if (lastVal == -7) blackKingMove = true;
        if (lastBox == 63) whiteRook1 = true;
        if (lastBox == 56) whiteRook2 = true;
        if (lastBox == 7) blackRook1 = true;
        if (lastBox == 0) blackRook2 = true;
        buttonBox[box].style.backgroundColor = "rgb(224,208,25)";
        buttonBox[lastBox].style.backgroundColor = "rgb(224,208,25)";
        imageBox[lastBox].src = "Images/transparent.png";

        if (lastVal == -1) imageBox[box].src = "Images/LiBP.png";
        if (lastVal == -5) imageBox[box].src = "Images/LiBR.png";
        if (lastVal == -3) imageBox[box].src = "Images/LiBn.png";
        if (lastVal == -4) imageBox[box].src = "Images/LiBB.png";
        if (lastVal == -9) imageBox[box].src = "Images/LiBQ.png";
        if (lastVal == -7) imageBox[box].src = "Images/LiBK.png";
        if (lastVal == 1) imageBox[box].src = "Images/LiWP.png";
        if (lastVal == 5) imageBox[box].src = "Images/LiWR.png";
        if (lastVal == 3) imageBox[box].src = "Images/LiWN.png";
        if (lastVal == 4) imageBox[box].src = "Images/LiWB.png";
        if (lastVal == 9) imageBox[box].src = "Images/LiWQ.png";
        if (lastVal == 7) imageBox[box].src = "Images/LiWK.png";
        if (valArray[box] == 0) {
          moveSound.play();
        } else {
          captureSound.play();
        }
        valArray[box] = lastVal;
        valArray[lastBox] = 0;
        chance++;
      }
    }
  }
}
