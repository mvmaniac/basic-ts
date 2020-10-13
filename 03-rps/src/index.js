var body = document.body;
var candidate;
var array;
var result = document.createElement('h1');
body.append(result);
var form = document.createElement('form');
body.append(form);
var input = document.createElement('input');
input.type = 'text';
input.maxLength = 4;
form.append(input);
var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);
var wrongCount = 0;
function clearAndFocusInput() {
    input.value = '';
    input.focus();
}
function chooseNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array = [];
    for (var i = 0; i < 4; i += 1) {
        var chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    console.log(array);
}
function restart() {
    clearAndFocusInput();
    chooseNumber();
    wrongCount = 0;
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var answer = input.value;
    if (answer === array.join('')) {
        result.textContent = '홈런';
        restart();
        return;
    }
    wrongCount += 1;
    if (wrongCount > 10) {
        result.textContent = "\n        10\uBC88 \uB118\uAC8C \uD2C0\uB824\uC11C \uC2E4\uD328! \n        \uB2F5\uC740 " + array.join(',') + " \uC600\uC2B5\uB2C8\uB2E4!\n      ";
        restart();
        return;
    }
    var answerArray = answer.split('');
    var strike = 0;
    var ball = 0;
    for (var i = 0; i <= 3; i += 1) {
        var item = Number(answerArray[i]);
        if (item === array[i]) {
            strike += 1;
        }
        else if (array.indexOf(item) > -1) {
            ball += 1;
        }
    }
    result.textContent = strike + "\uC2A4\uD2B8\uB77C\uC774\uD06C " + ball + "\uBCFC \uC785\uB2C8\uB2E4.";
    clearAndFocusInput();
});
chooseNumber();
clearAndFocusInput();
