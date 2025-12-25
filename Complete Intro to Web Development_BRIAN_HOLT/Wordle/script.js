const GET_URL = 'https://words.dev-apis.com/word-of-the-day';
const POST_URL = 'https://words.dev-apis.com/validate-word';
let todaysWord = '';
const ANSWER_LENGTH = 5;
let cnt = 0;
let guessWord = '';

async function getTodaysWord() {
  const promise = await fetch(GET_URL);
  const response = await promise.json();
  return response.word;
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function handleLetter(letter) {
  if (guessWord.length < ANSWER_LENGTH) guessWord += letter;
  else {
    guessWord = guessWord.slice(0, guessWord.length - 1) + letter;
  }
  document.getElementById('letter-' + (ANSWER_LENGTH * cnt + guessWord.length)).innerText = letter;
}

function makeMap(word) {
  console.log(word);
  const obj = {};
  for (let i = 0; i < word.length; i++) {
    if (obj[word[i]]) {
      obj[word[i]]++;
    } else {
      obj[word[i]] = 1;
    }
  }
  // console.log(obj);

  return obj;
}

async function handleEnterClicked() {
  const todaysWordMap = makeMap(todaysWord);

  console.log('entered guessWord: ', guessWord);
  document.querySelector('.loading').classList.remove('hidden');
  let response = await wordCheck(guessWord);
  document.querySelector('.loading').classList.add('hidden');

  if (response) {
    if (guessWord === todaysWord) {
      for (let i = 0; i < guessWord.length; i++) {
        document.getElementById('letter-' + (ANSWER_LENGTH * cnt + i + 1)).classList.add('correct');
      }

      setTimeout(() => alert('you win'), 20);
      document.querySelector('header').classList.add('win');
    } else {
      if (cnt === 5) {
        alert('you lose!');
      }
      for (let i = 0; i < guessWord.length; i++) {
        if (todaysWord[i] === guessWord[i]) {
          document
            .getElementById('letter-' + (ANSWER_LENGTH * cnt + i + 1))
            .classList.add('correct');
          todaysWordMap[guessWord[i]]--;
          console.log(todaysWordMap);
        }
      }

      for (let i = 0; i < guessWord.length; i++) {
        if (todaysWord[i] === guessWord[i]) {
        } else if (todaysWordMap[guessWord[i]] && todaysWordMap[guessWord[i]] > 0) {
          document.getElementById('letter-' + (ANSWER_LENGTH * cnt + i + 1)).classList.add('close');
          todaysWordMap[guessWord[i]]--;
        } else {
          document.getElementById('letter-' + (ANSWER_LENGTH * cnt + i + 1)).classList.add('wrong');
        }
      }
    }

    cnt++;
    guessWord = '';
  } else {
    for (let i = 0; i < guessWord.length; i++) {
      console.log('INVALID');

      document
        .getElementById('letter-' + (ANSWER_LENGTH * cnt + i + 1))
        .classList.remove('invalid');

      setTimeout(
        () =>
          document
            .getElementById('letter-' + (ANSWER_LENGTH * cnt + i + 1))
            .classList.add('invalid'),
        15,
      );
    }
  }
}

async function wordCheck(guessWord) {
  const promise = await fetch(POST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word: guessWord }),
  });

  const response = await promise.json();

  return response.validWord;
}

function handleBackspaceClicked() {
  document.getElementById('letter-' + (ANSWER_LENGTH * cnt + guessWord.length)).innerText = '';
  guessWord = guessWord.slice(0, guessWord.length - 1);
}

async function init() {
  document.querySelector('.loading').classList.remove('hidden');
  todaysWord = await getTodaysWord();
  console.log('Todays guessWord loaded: ', todaysWord);
  document.querySelector('.loading').classList.add('hidden');

  document.addEventListener('keydown', (event) => {
    if (isLetter(event.key)) handleLetter(event.key);
    else if (event.key === 'Enter' && guessWord.length === ANSWER_LENGTH) handleEnterClicked();
    else if ((event.key === 'Delete' || event.key === 'Backspace') && guessWord !== '')
      handleBackspaceClicked();
  });
}
init();
