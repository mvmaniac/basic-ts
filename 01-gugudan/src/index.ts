let numberOne: number;
let numberTwo: number;
let result: number;

const word = document.createElement('div');
document.body.append(word);

const form = document.createElement('form');
document.body.append(form);

const input = document.createElement('input');
form.append(input);

const button = document.createElement('button');
button.textContent = '입력!';
form.append(button);

const resultDiv = document.createElement('div');
document.body.append(resultDiv);

function generateNumber() {
  numberOne = Math.ceil(Math.random() * 9);
  numberTwo = Math.ceil(Math.random() * 9);
  result = numberOne * numberTwo;
}

function displayNumber() {
  word.textContent = `${numberOne} 곱하기 ${numberTwo}는 ?`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (result === Number(input.value)) {
    resultDiv.textContent = '딩동댕';
    generateNumber();
    displayNumber();
  } else {
    resultDiv.textContent = '땡';
  }

  input.value = '';
  input.focus();
});

generateNumber();
displayNumber();
