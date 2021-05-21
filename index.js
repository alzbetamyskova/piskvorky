'use strict';


let whoPlays = 'circle';

let imgElm = document.querySelector('.char');
const btnList = document.querySelectorAll('.btn');

// Špatná volba anonymní funkce
// btnList.forEach(btn => btn.addEventListener('click', function() {
//   btn.classList.add(whoPlays);
//   btn.disabled = true;

//   if (whoPlays === 'circle') {
//      whoPlays = 'cross';
//   } else if (whoPlays === 'cross') {
//      whoPlays = 'circle';
//   } else {
//     alert('Chyba!');
//   }

//   imgElm.src = `images/${whoPlays}.svg`;
// }));

// Nová volba funkce přes event a cyklus for
const game = (event) => {
  let square = event.target;

  if (square.className === 'btn') {

    if (whoPlays === 'circle') {
      square.classList.add('circle');
      whoPlays = 'cross';
      imgElm.src = 'images/cross.svg';
      square.disabled = true;
    } else if (whoPlays === 'cross') {
      square.classList.add('cross');
      whoPlays = 'circle';
      imgElm.src = 'images/circle.svg';
      square.disabled = true;
    };
  };

  win(square);

};

for (let i = 0; i < btnList.length; i++) {
  btnList[i].addEventListener('click', game);
};


//funkce, která pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.
const getSymbol = (field) => {
  if (field.classList.contains('cross')) {
    return 'cross';
  } else if (field.classList.contains('circle')) {
    return 'circle';
  }
};

//funkce, která pro číslo řádku a sloupce vrátí příslušný prvek.
const boardSize = 10;
const fields = document.querySelectorAll('.btn');
const getField = (row, column) => fields[row * boardSize + column];

// funkce, která naopak pro dané políčko vrátí objekt s číslem řádku a sloupce.
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

// funkce, která se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět.
const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;
  
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1)) //
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolů
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  // Koukni sikmo nahoru doleva
  let j;
  i = origin.column;
  j = origin.row;

  let inDiaLeft = 1;

  while (j > 0 && i > 0 && symbol === getSymbol(getField(j - 1, i - 1))) {
    inDiaLeft++;
    i--;
    j--;
  }

  // Koukni sikmo dolu doprava
  i = origin.column;
  j = origin.row;
  while (
    j < boardSize - 1 &&
    i < boardSize - 1 &&
    symbol === getSymbol(getField(j + 1, i + 1)) //
  ) {
    inDiaLeft++;
    i++;
    j++;
  }

  if (inDiaLeft >= symbolsToWin) {
    return true;
  }

  let inDiaRight = 1;

  // Koukni sikmo nahoru doprava
  i = origin.column;
  j = origin.row;
  while (j > 0 && i > 0 && symbol === getSymbol(getField(j - 1, i + 1))) {
    inDiaRight++;
    i++;
    j--;
  }

  // Koukni sikmo dolu doleva
  i = origin.column;
  j = origin.row;
  while (
    i < boardSize - 1 &&
    j < boardSize - 1 &&
    symbol === getSymbol(getField(j + 1, i - 1)) //
  ) {
    inRow++;
    i--;
    j++;
  }

  if (inDiaRight >= symbolsToWin) {
    return true;
  }
  return false;
};

// funkce, která vyvolá alert a vrátí hru na začátek
const whoWin = (whoWon) => {
  setTimeout(() => {
    const newGame = confirm(`Vyhrává ${whoWon}! Spustit novou hru?`);
    if (newGame) {
      location.reload();
    } else {
      btnList.forEach((el) => {
        el.disabled = true;
      });
    }
  }, 200);
};

const win = (field) => {
  if (isWinningMove(field) === true) {
    if (getSymbol(field) === 'circle') {
      whoWin('kolečko');
    } else if (getSymbol(field) === 'cross') {
      whoWin('křížek');
    }
  }
};