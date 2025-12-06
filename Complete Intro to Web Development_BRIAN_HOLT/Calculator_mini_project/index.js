let displaynumber = '0';
const screen = document.querySelector('.display-container');
let keepNumber;
let keepChar;

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    clickedNaN(value);
  } else {
    clickedNumber(value);
  }
}

function clickedNumber(value) {
  if (displaynumber === '0' && value !== '0') {
    displaynumber = value;
  } else {
    displaynumber += '' + value;
  }
  rerender();
}

function clickedNaN(value) {
  console.log(value);
  switch (value) {
    case 'C':
      displaynumber = '0';
      rerender();
      return;
    case '←':
      if (displaynumber.length >= 2) {
        displaynumber = displaynumber.slice(0, displaynumber.length - 1);
        rerender();
        return;
      } else {
        displaynumber = '0';
        rerender();
        return;
      }
    case '÷':
    case '-':
    case '+':
    case '×':
      keepNumber = parseInt(displaynumber);
      displaynumber = '0';
      keepChar = value;
      console.log(keepNumber, keepChar);
      rerender();
      return;

    case '=':
      result();
  }
}

function result() {
  switch (keepChar) {
    case '÷':
      displaynumber = parseInt(keepNumber) / parseInt(displaynumber);
      rerender();
      return;

    case '×':
      displaynumber = parseInt(keepNumber) * parseInt(displaynumber);
      rerender();
      return;

    case '-':
      displaynumber = parseInt(keepNumber) - parseInt(displaynumber);
      rerender();
      return;

    case '+':
      displaynumber = parseInt(keepNumber) + parseInt(displaynumber);
      rerender();
      return;
  }
}

function rerender() {
  screen.innerText = displaynumber;
}
function init() {
  console.log('hi from index.js');

  document.querySelectorAll('.box').forEach((button) => {
    button.addEventListener('click', (event) => buttonClick(event.target.innerText));
  });
}

init();
