let timesToRepeat = 2;
let character = '💕';

let answer = '';
for (let i = 0; i < timesToRepeat; i++) {
  answer += character;
}

// console.log(answer);

// console.log(answer.padStart(timesToRepeat, character));

let arr = ['Car', 'Diploma', 'Own family', 'Friend', 'Apartment', 'Home'];

for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
}

arr.forEach((i) => console.log(i));

// foreach => run this function for every elem of arr
arr.forEach(function (city) {
  console.log(city);
});