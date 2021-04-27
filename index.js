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


// function() {
//   if (whoPlays === 'circle') {
//      btn.classList.add('circle');
//      btn.disabled = true;
//      whoPlays = 'cross';
//   } else if (whoPlays === 'cross') {
//      btn.classList.add('cross');
//      btn.disabled = true;
//      whoPlays = 'circle';
//   } else {
//     alert('Chyba!');
//   }

//   imgElm.src = `images/${whoPlays}.svg`;
// }

