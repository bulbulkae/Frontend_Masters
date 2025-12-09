const GET_URL = 'https://words.dev-apis.com/word-of-the-day';
const POST_URL = 'https://words.dev-apis.com/validate-word';
let todaysWord = '';
let cnt = 0;
let word = '';

async function getTodaysWord() {
  const promise = await fetch(GET_URL);
  const response = await promise.json();
  return response.word;
}

const setTodaysWord = async () => {
  todaysWord = await getTodaysWord();
};

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function handleLetter(letter) {
  if (
    (cnt !== 5 && cnt !== 10 && cnt !== 15 && cnt !== 20 && cnt !== 25 && cnt !== 30) ||
    word === ''
  ) {
    cnt++;
    word += letter;
    let elemId = 'letter-' + cnt;
    document.getElementById(elemId).innerText = letter;
  }
}

async function handleEnterClicked() {
  console.log('entered word: ', word);
  if (await wordCheck(word)) {
    for (let i = 0; i < word.length; i++) {
      console.log(word[i], i);
      if (todaysWord.includes(word[i])) {
        document.getElementById('letter-' + (i + 1)).style.backgroundColor = 'green';
      }
    }
  } else {
    console.log('hah wrong word');
  }
  word = '';
  console.log('cnt:', cnt, 'word: ', word);
}

async function wordCheck(word) {
  const promise = await fetch(POST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word: word }),
  });

  const response = await promise.json();

  return response.validWord;
}

function handleBackspaceClicked() {
  console.log('Backspace');
  if (cnt > 0) {
    document.getElementById('letter-' + cnt).innerText = '';
    cnt--;
    word = word.slice(0, word.length - 1);
    console.log(cnt, word);
  }
}

async function init() {
  document.querySelector('.loading').classList.remove('hidden');
  await setTodaysWord();
  console.log('Todays word loaded: ', todaysWord);
  document.querySelector('.loading').classList.add('hidden');

  document.addEventListener('keydown', (event) => {
    if (!isLetter(event.key)) {
      //   console.log(event.key);
      if (event.key === 'Enter' && cnt % 5 === 0) handleEnterClicked();
      else if (event.key === 'Delete' || event.key === 'Backspace') handleBackspaceClicked();
      else event.preventDefault();
    } else handleLetter(event.key);
  });
}
init();
