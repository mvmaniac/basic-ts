const { body } = document;

let candidate: number[];
let array: number[];

const result = document.createElement('h1');
body.appendChild(result);

const form = document.createElement('form');
body.appendChild(form);

const input = document.createElement('input');
input.type = 'text';
input.maxLength = 4;
form.appendChild(input);

const button = document.createElement('button');
button.textContent = '입력!';
form.appendChild(button);

let wrongCount = 0;

function clearAndFocusInput() {
  input.value = '';
  input.focus();
}

function chooseNumber() {
  candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  array = [];

  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  console.log(array);
}

function restart() {
  clearAndFocusInput();
  chooseNumber();
  wrongCount = 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const answer = input.value;

  if (answer === array.join('')) {
    result.textContent = '홈런';

    restart();
    return;
  }

  wrongCount += 1;

  if (wrongCount > 10) {
    result.textContent = `
        10번 넘게 틀려서 실패! 
        답은 ${array.join(',')} 였습니다!
      `;

    restart();
    return;
  }

  const answerArray = answer.split('');
  let strike = 0;
  let ball = 0;

  for (let i = 0; i <= 3; i += 1) {
    const item = Number(answerArray[i]);

    if (item === array[i]) {
      strike += 1;
    } else if (array.indexOf(item) > -1) {
      ball += 1;
    }
  }

  result.textContent = `${strike}스트라이크 ${ball}볼 입니다.`;
  clearAndFocusInput();
});

chooseNumber();
clearAndFocusInput();
