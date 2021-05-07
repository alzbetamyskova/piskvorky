'use strict';


let whoPlays = 'circle';

const imgElm = document.querySelector('.char');
const btnList = document.querySelectorAll('.btn');

btnList.forEach(btn => btn.addEventListener('click', function() {
  btn.classList.add(whoPlays);
  btn.disabled = true;

  if (whoPlays === 'circle') {
     whoPlays = 'cross';
  } else if (whoPlays === 'cross') {
     whoPlays = 'circle';
  } else {
    alert('Chyba!');
  }

  imgElm.src = `images/${whoPlays}.svg`;
}));


const getSymbol = (field) => {
  if (field.classList.contains('cross')) {
    return 'cross'
  } else if (field.classList.contains('circle')) {
    return 'circle'
  }
};

const boardSize = 10;

const fields = document.querySelectorAll('.btn')

const getField = (row, column) => {
  fields[row * boardSize + column];
};

const getPosition = (field) => {
  let box = 0;

  while (box < fields.length && field !== fields[box]) {
		box++
	}

	return {
		row: Math.floor(box / boardSize),
		column: box % boardSize,
	}
};

